import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../config/db";
import { JWT_SECRET } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJWT = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token =
				req.cookies?.accessToken ||
				req.header("Authorization")?.replace("Bearer ", "");

			if (!token) {
				throw new ApiError(401, "Unauthorized request");
			}

			const decodedToken: JwtPayload = jwt.verify(
				token,
				JWT_SECRET
			) as JwtPayload;

			const user = await db.user.findFirst({
				where: {
					id: decodedToken?._id,
				},
			});

			if (!user) {
				throw new ApiError(401, "Invalid Access Token");
			}

			req.user = user;

			next();
		} catch (error) {
			console.log("Error: ", error);
			return res
				.status(401)
				.json(new ApiResponse(401, null, "Unauthorized request"));
		}
	}
);
