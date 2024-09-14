import { z } from "zod";

export const FlightCreateSchema = z.object({
	flightNumber: z.string(),
	airplaneId: z.string().uuid(),
	departureAirportId: z.string().uuid(),
	arrivalAirportId: z.string().uuid(),
	departureTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	arrivalTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date()
	),
	price: z.number(),
	boardingGate: z.string(),
	totalSeats: z.number(),
});

export const FlightQuerySchema = z.object({
	tripType: z.enum(["one-way", "round-trip"]), // Validates trip type
	minPrice: z.number().nonnegative().optional(), // Min price must be a non-negative number
	maxPrice: z.number().nonnegative().optional(), // Max price must be a non-negative number
	travellers: z.number().int().positive(), // Must be a positive integer
	tripDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date format",
		}), // Validates date string
	sortBy: z.enum(["price", "departureDate"]).optional(), // Optional sort by price or departure date
});

export const FlightGetSchema = z.object({
	id: z.string(),
});

export const FlightUpdateSchema = z.object({
	flightNumber: z.string(),
	airplaneId: z.string(),
	departureAirportId: z.string(),
	arrivalAirportId: z.string(),
	departureTime: z.date(),
	arrivalTime: z.date(),
	price: z.number(),
	boardingGate: z.string(),
	totalSeats: z.number(),
});

export const FlightDeleteSchema = z.object({
	id: z.string(),
});
