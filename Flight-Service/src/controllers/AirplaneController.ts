import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
	AirplaneCreateSchema,
	AirplaneDeleteSchema,
	AirplaneGetSchema,
	AirplaneUpdateSchema,
} from "../validations/AirplaneValidation";

const createAirplane = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = AirplaneCreateSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Validation Error", error);
	}

	const airplane = await db.airplane.create({
		data: {
			modelNumber: data.modelNumber,
			capacity: data.capacity,
		},
	});

	if (!airplane) {
		throw new ApiError(500, "Something went wrong while creating airplane");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airplane, "Airplane created successfully"));
});

const getAllAirplane = asyncHandler(async (_: Request, res: Response) => {
	const airplanes = await db.airplane.findMany({});

	if (!airplanes) {
		throw new ApiError(404, "Something went wrong while finding airplanes");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airplanes, "Airplanes found successfully"));
});

const getAirplane = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = AirplaneGetSchema.safeParse(req.params);

	if (!success) {
		throw new ApiError(400, "Validation Error", error);
	}

	const airplane = await db.airplane.findFirst({
		where: {
			id: data.id,
		},
	});

	if (!airplane) {
		throw new ApiError(404, "Something went wrong while finding airplane");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, airplane, "Airplane found successfully"));
});

const updateAirplane = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = AirplaneUpdateSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Validation Error", error);
	}

	const updateData: Partial<{ modelNumber: string; capacity: number }> = {
		modelNumber: data.modelNumber,
		capacity: data.capacity,
	};

	const updatedAirplane = await db.airplane.update({
		where: {
			id: data.id,
		},
		data: updateData,
	});

	if (!updatedAirplane) {
		throw new ApiError(404, "Something went wrong while updating airplane");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				updatedAirplane,
				"Airplane updated successfully"
			)
		);
});

const deleteAirplane = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = AirplaneDeleteSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Validation Error", error);
	}

	const deletedAirplane = await db.airplane.delete({
		where: {
			id: data.id,
		},
	});

	if (!deletedAirplane) {
		throw new ApiError(404, "Something went wrong while deleting airplane");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Airplane deleted successfully"));
});

export {
	createAirplane,
	deleteAirplane,
	getAirplane,
	getAllAirplane,
	updateAirplane,
};
