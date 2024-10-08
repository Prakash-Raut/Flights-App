import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
	FlightCreateSchema,
	FlightGetSchema,
} from "../validations/FlightValidation";

const createFlight = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = FlightCreateSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid data", error);
	}

	const flight = await db.flight.create({
		data: {
			flightNumber: data.flightNumber,
			airplaneId: data.airplaneId,
			departureAirportId: data.departureAirportId,
			arrivalAirportId: data.arrivalAirportId,
			departureTime: data.departureTime,
			arrivalTime: data.arrivalTime,
			price: data.price,
			boardingGate: data.boardingGate,
			totalSeats: data.totalSeats,
		},
	});

	if (!flight) {
		throw new ApiError(500, "Something went wrong while creating flight");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, flight, "Flight created successfully"));
});

const getAllFlight = asyncHandler(async (_req: Request, res: Response) => {
	// const { success, data, error } = FlightQuerySchema.safeParse(req.query);

	// if (!success) {
	// 	throw new ApiError(400, "Invalid data", error);
	// }

	const flights = await db.flight.findMany({
		include: {
			airplane: true,
			departureAirport: true,
			arrivalAirport: true,
		},
	});

	if (!flights) {
		throw new ApiError(404, "Something went wrong while finding flights");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, flights, "Flights found successfully"));
});

const getFlight = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = FlightGetSchema.safeParse(req.params);

	if (!success) {
		throw new ApiError(400, "Invalid data", error);
	}

	const flight = await db.flight.findFirst({
		where: {
			id: data.id,
		},
	});

	if (!flight) {
		throw new ApiError(404, "Something went wrong while finding flight");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, flight, "Flight found successfully"));
});

const updateFlight = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = FlightCreateSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid data", error);
	}

	const updateData: Partial<{
		flightNumber: string;
		airplaneId: string;
		departureAirportId: string;
		arrivalAirportId: string;
		departureTime: Date;
		arrivalTime: Date;
		price: number;
		boardingGate: string;
		totalSeats: number;
	}> = {
		flightNumber: data.flightNumber,
		airplaneId: data.airplaneId,
		departureAirportId: data.departureAirportId,
		arrivalAirportId: data.arrivalAirportId,
		departureTime: data.departureTime,
		arrivalTime: data.arrivalTime,
		price: data.price,
		boardingGate: data.boardingGate,
		totalSeats: data.totalSeats,
	};

	const flight = await db.flight.update({
		where: {
			id: req.params.id,
		},
		data: updateData,
	});

	if (!flight) {
		throw new ApiError(404, "Something went wrong while updating flight");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, flight, "Flight updated successfully"));
});

const deleteFlight = asyncHandler(async (req: Request, res: Response) => {
	const flightId = req.params.id;

	const flight = await db.flight.delete({
		where: {
			id: flightId,
		},
	});

	if (!flight) {
		throw new ApiError(404, "Something went wrong while deleting flight");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, flight, "Flight deleted successfully"));
});

export { createFlight, deleteFlight, getAllFlight, getFlight, updateFlight };
