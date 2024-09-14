import { Request, Response } from "express";
import { db } from "../config/PrismaConfig";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { sendEmail } from "../utils/sendemail";

const createEmail = asyncHandler(async (req: Request, res: Response) => {
	try {
		const { subject, description, recepientEmail } = req.body;

		const ticket = await db.ticket.create({
			data: {
				subject,
				description,
				recepientEmail,
			},
		});

		const response = await sendEmail(
			recepientEmail,
			recepientEmail,
			subject,
			description
		);

		if (!ticket) {
			throw new ApiError(
				400,
				"Something went wrong while creating email"
			);
		}

		return res
			.status(200)
			.json(new ApiResponse(200, response, "Email created successfully"));
	} catch (error) {
		console.error("Cannot create email", error);
		return res
			.status(500)
			.json(new ApiResponse(500, "Internal server error"));
	}
});

export { createEmail };
