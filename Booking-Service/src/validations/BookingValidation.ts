import { z } from "zod";

export const bookingSchema = z.object({
	userId: z.string().uuid(),
	flightId: z.string().uuid(),
	noOfSeats: z.number().positive(),
});

export const paymentSchema = z.object({
	userId: z.string().uuid(),
	bookingId: z.string().uuid(),
	amount: z.number().positive(),
});
