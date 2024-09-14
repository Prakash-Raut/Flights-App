import { z } from "zod";

export const AirplaneCreateSchema = z.object({
	modelNumber: z.string(),
	capacity: z.number().int().min(5).max(1000),
});

export const AirplaneGetSchema = z.object({
    id: z.string(),
});

export const AirplaneUpdateSchema = z.object({
    id: z.string(),
    modelNumber: z.string(),
    capacity: z.number().int().min(5).max(1000),
});

export const AirplaneDeleteSchema = z.object({
    id: z.string(),
});

