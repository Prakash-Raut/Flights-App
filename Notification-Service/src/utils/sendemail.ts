import { mailSender } from "../config/EmailConfig";

export async function sendEmail(
	mailFrom: string,
	mailTo: string,
	mailSubject: string,
	mailText: string
) {
	return await mailSender.sendMail({
		from: mailFrom,
		to: mailTo,
		subject: mailSubject,
		text: mailText,
	});
}
