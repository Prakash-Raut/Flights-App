import { PrismaClient } from "@prisma/client";

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

export const db = PrismaConfig.getInstance().getPrisma();
