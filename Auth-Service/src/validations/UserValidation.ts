import { z } from "zod";

export const UserCreateSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const UserLoginSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const UserUpdateSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const UserDeleteSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
});
