import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createCity = asyncHandler(async (req: Request, res: Response) => {
	const { name } = req.body;

	const city = await db.city.create({
		data: {
			name,
		},
	});

	if (!city) {
		throw new ApiError(500, "Something went wrong while creating city");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, city, "City created successfully"));
});

const getAllCity = asyncHandler(async (_: Request, res: Response) => {
	const cities = await db.city.findMany({});

	if (!cities) {
		throw new ApiError(404, "Something went wrong while finding cities");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, cities, "Retrieved cities successfully"));
});

const getCity = asyncHandler(async (req: Request, res: Response) => {
	const cityId = req.params.id;

	const city = await db.city.findFirst({
		where: {
			id: cityId,
		},
	});

	if (!city) {
		throw new ApiError(404, "Something went wrong while finding city");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, city, "City found successfully"));
});

const updateCity = asyncHandler(async (req: Request, res: Response) => {
	const cityId = req.params.id;
	const name = req.body.name;

	const updatedCity = await db.city.update({
		where: {
			id: cityId,
		},
		data: {
			name,
		},
	});

	if (!updatedCity) {
		throw new ApiError(404, "Something went wrong while updating city");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedCity, "City updated successfully"));
});

const deleteCity = asyncHandler(async (req: Request, res: Response) => {
	const cityId = req.params.id;

	const deletedCity = await db.city.delete({
		where: {
			id: cityId,
		},
	});

	if (!deletedCity) {
		throw new ApiError(404, "Something went wrong while deleting city");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, null, "City deleted successfully"));
});

export { createCity, deleteCity, getAllCity, getCity, updateCity };
