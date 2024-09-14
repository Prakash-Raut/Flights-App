import cron from "node-cron";
import { db } from "../config/db";

export function scheduleCrons() {
	cron.schedule("*/30 * * * *", async () => {
		// cancel old bookings
		await db.$transaction(async () => {});
	});
}
