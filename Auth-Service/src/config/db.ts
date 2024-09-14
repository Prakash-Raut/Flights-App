import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	JWT_EXPIRY,
	JWT_SECRET,
	REFRESH_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET,
	SALT_ROUNDS,
} from "../config/env";

class PrismaConfig {
	private static instance: PrismaConfig;
	private prisma: PrismaClient;

	private constructor() {
		this.prisma = new PrismaClient();
	}

	public static getInstance(): PrismaConfig {
		if (!PrismaConfig.instance) {
			PrismaConfig.instance = new PrismaConfig();
		}
		return PrismaConfig.instance;
	}

	public getPrisma(): PrismaClient {
		return this.prisma;
	}
}

const prisma = PrismaConfig.getInstance().getPrisma();

interface IUser {
	id: string;
	email: string;
	password: string;
}

const db = prisma.$extends({
	model: {
		user: {
			async hashPassword(password: string): Promise<string> {
				return bcrypt.hash(password, SALT_ROUNDS);
			},
			async isPasswordCorrect(
				user: IUser,
				inputPassword: string
			): Promise<boolean> {
				return bcrypt.compare(inputPassword, user.password);
			},
			async generateAccessToken(
				user: IUser
			): Promise<string | undefined> {
				return new Promise((resolve, reject) => {
					jwt.sign(
						{ id: user.id },
						JWT_SECRET,
						{ expiresIn: JWT_EXPIRY },
						(err, token) => {
							if (err) {
								return reject(err);
							}
							resolve(token);
						}
					);
				});
			},
			async generateRefreshToken(
				user: IUser
			): Promise<string | undefined> {
				return new Promise((resolve, reject) => {
					jwt.sign(
						{ id: user.id },
						REFRESH_TOKEN_SECRET,
						{ expiresIn: REFRESH_TOKEN_EXPIRY },
						(err, token) => {
							if (err) {
								return reject(err);
							}
							resolve(token);
						}
					);
				});
			},
		},
	},
});

export { db };
