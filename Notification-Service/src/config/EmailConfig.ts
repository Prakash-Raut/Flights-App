import nodemailer from "nodemailer";
import { APP_PASS, EMAIL } from "./env";

export const mailSender = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL,
		pass: APP_PASS,
	},
});
