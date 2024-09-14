import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createCity = asyncHandler(async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		console.log("Cannot create city", error);
		return res
			.status(500)
			.json(new ApiResponse(500, null, "Internal server error"));
	}
});

const getAllCity = asyncHandler(async (_: Request, res: Response) => {
	try {
		const cities = await db.city.findMany({});

		if (!cities) {
			throw new ApiError(404, "Something went wrong while finding cities");
		}

		return res
			.status(200)
			.json(
				new ApiResponse(200, cities, "Retrieved cities successfully")
			);
	} catch (error) {
		console.log("Cannot find cities", error);
		return res
			.status(500)
			.json(new ApiResponse(500, null, "Internal server error"));
	}
});

const getCity = asyncHandler(async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		console.log("Cannot find city", error);
		return res
			.status(500)
			.json(new ApiResponse(500, null, "Internal server error"));
	}
});

const updateCity = asyncHandler(async (req: Request, res: Response) => {
	try {
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
			.json(
				new ApiResponse(200, updatedCity, "City updated successfully")
			);
	} catch (error) {
		console.log("Cannot find city to update", error);
		return res
			.status(500)
			.json(new ApiResponse(500, null, "Internal server error"));
	}
});

const deleteCity = asyncHandler(async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		console.log("Cannot find city airplane to delete", error);
		return res
			.status(500)
			.json(new ApiResponse(500, null, "Internal server error"));
	}
});

export { createCity, deleteCity, getAllCity, getCity, updateCity };
