import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
	UserCreateSchema,
	UserLoginSchema,
} from "../validations/UserValidation";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { success, data, error } = UserCreateSchema.safeParse(req.body);

		if (!success) {
			throw new ApiError(
				400,
				"validation error",
				error.errors[0].message
			);
		}

		const existedUserWithEmail = await db.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (existedUserWithEmail) {
			throw new ApiError(409, "User already exists");
		}

		const hashedPassword = await db.user.hashPassword(data.password);

		const user = await db.user.create({
			data: {
				email: data.email,
				password: hashedPassword,
			},
		});

		if (!user) {
			throw new ApiError(500, "Something went wrong while creating user");
		}

		const createdUser = await db.user.findFirst({
			where: {
				email: data.email,
			},
			select: {
				id: true,
				email: true,
				password: false,
				refreshToken: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!createdUser) {
			throw new ApiError(500, "Something went wrong while creating user");
		}

		return res
			.status(200)
			.json(
				new ApiResponse(200, createdUser, "User created successfully")
			);
	} catch (error) {
		console.error("Error creating user", error);
		throw new ApiError(500, "Internal server error");
	}
});

const generateAccessAndRefereshTokens = async (userId: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new ApiError(404, "User not found");
		}

		const accessToken = await db.user.generateAccessToken(user);

		const refreshToken = await db.user.generateRefreshToken(user);

		if (refreshToken) {
			user.refreshToken = refreshToken;
		}

		return { accessToken, refreshToken };
	} catch (error) {
		console.log("Error: ", error);
		throw new ApiError(
			500,
			"Something went wrong while generating referesh and access token"
		);
	}
};

const loginUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { success, data, error } = UserLoginSchema.safeParse(req.body);

		if (!success) {
			throw new ApiError(
				400,
				"Validation error",
				error.errors[0].message
			);
		}

		const user = await db.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (!user) {
			throw new ApiError(404, "User does not exist");
		}

		const encryptedPassword = await bcrypt.compare(
			data.password,
			user.password
		);

		if (!encryptedPassword) {
			throw new ApiError(400, "Invalid credentials");
		}

		const { accessToken, refreshToken } =
			await generateAccessAndRefereshTokens(user.id);

		if (!accessToken || !refreshToken) {
			throw new ApiError(500, "Failed to generate tokens");
		}

		const loggedInUser = await db.user.findFirst({
			where: {
				email: data.email,
			},
			select: {
				id: true,
				email: true,
				password: false,
				refreshToken: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json(
				new ApiResponse(
					200,
					{
						user: loggedInUser,
					},
					"User logged in successfully"
				)
			);
	} catch (error) {
		console.error("Error during user authentication", error);
		throw new ApiError(500, "Internal server error");
	}
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
	try {
		return res
			.status(200)
			.json(new ApiResponse(200, req.user, "User found successfully"));
	} catch (error) {
		console.error("Error getting current user", error);
		throw new ApiError(500, "Internal server error");
	}
});

export { getCurrentUser, loginUser, registerUser };
