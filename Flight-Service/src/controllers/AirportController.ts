import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createAirport = asyncHandler(async (req: Request, res: Response) => {
	const { name, code, address, cityId } = req.body;

	const airport = await db.airport.create({
		data: {
			name,
			code,
			address,
			cityId,
		},
	});

	if (!airport) {
		throw new ApiError(500, "Something went wrong while creating airport");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airport, "Airport created successfully"));
});

const getAllAirport = asyncHandler(async (_: Request, res: Response) => {
	const airports = await db.airport.findMany({});

	if (!airports) {
		throw new ApiError(404, "Something went wrong while finding airports");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, airports, "Retrieved airports successfully")
		);
});

const getAirport = asyncHandler(async (req: Request, res: Response) => {
	const airportId = req.params.id;

	const airport = await db.airport.findFirst({
		where: {
			id: airportId,
		},
	});

	if (!airport) {
		throw new ApiError(404, "Something went wrong while finding airport");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airport, "Retrieved airport successfully"));
});

const updateAirport = asyncHandler(async (req: Request, res: Response) => {
	const { airportId, code } = req.body;

	const airport = await db.airport.update({
		where: {
			id: airportId,
		},
		data: {
			code,
		},
	});

	if (!airport) {
		throw new ApiError(404, "Something went wrong while updating airport");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airport, "Airport updated successfully"));
});

const deleteAirport = asyncHandler(async (req: Request, res: Response) => {
	const airportId = req.params.id;

	const airport = await db.airport.delete({
		where: {
			id: airportId,
		},
	});

	if (!airport) {
		throw new ApiError(404, "Something went wrong while deleting airport");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airport, "Airport deleted successfully"));
});

export {
	createAirport,
	deleteAirport,
	getAirport,
	getAllAirport,
	updateAirport,
};
