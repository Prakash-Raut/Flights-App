import type { Request, Response } from "express";
import { getFlightDetail } from "../api/getFlightDetail";
import { db } from "../config/db";
import { publishToQueue } from "../config/rabbitMqConfig";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { bookingSchema, paymentSchema } from "../validations/BookingValidation";

const inMemDb: Record<string, boolean> = {};

const createBooking = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = bookingSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid data", error);
	}

	const flight = await getFlightDetail(data.flightId);

	if (!flight) {
		throw new ApiError(404, "Something went wrong while fetching flight");
	}

	if (flight.totalSeats < data.noOfSeats) {
		throw new ApiError(400, "Seats are not available");
	}

	// calculate total price
	const totalPrice = data.noOfSeats * flight.price;

	// update total seats in flight

	const booking = await db.booking.create({
		data: {
			userId: data.userId,
			flightId: data.flightId,
			noOfSeats: data.noOfSeats,
			totalCost: totalPrice,
		},
	});

	if (!booking) {
		throw new ApiError(500, "Something went wrong while creating booking");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, booking, "Booking created successfully"));
});

const makePayment = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = paymentSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid data", error);
	}

	const { bookingId, userId, amount } = data;

	const idempotencyKey = req.headers["x-idempotency-key"] as string;

	if (!idempotencyKey) {
		return res
			.status(400)
			.json(new ApiResponse(400, null, "Idempotency key is required"));
	}

	if (inMemDb[idempotencyKey]) {
		return res
			.status(400)
			.json(new ApiResponse(400, null, "Payment already made"));
	}

	const payment = await db.$transaction(async (db) => {
		const bookingDetails = await db.booking.findUnique({
			where: {
				id: bookingId,
			},
		});

		if (!bookingDetails) {
			throw new ApiError(404, "Booking not found");
		}

		if (bookingDetails.userId !== userId) {
			throw new ApiError(400, "User not authorized to make payment");
		}

		console.log(bookingDetails.totalCost, amount);

		if (bookingDetails.totalCost !== amount) {
			throw new ApiError(400, "Payment amount is not correct");
		}

		const updatedBooking = await db.booking.update({
			where: {
				id: bookingId,
			},
			data: {
				status: "BOOKED",
			},
		});

		await publishToQueue({
			recepientEmail: "cs191297@gmail.com",
			subject: "Flight booked",
			text: `Booking successfully done for the booking ${bookingId}`,
		});

		if (!updatedBooking) {
			throw new ApiError(
				500,
				"Something went wrong while updating booking"
			);
		}

		return updatedBooking;
	});

	if (!payment) {
		throw new ApiError(500, "Something went wrong while making payment");
	}

	inMemDb[idempotencyKey] = true;

	return res
		.status(200)
		.json(new ApiResponse(200, payment, "Payment made successfully"));
});

export { createBooking, makePayment };
