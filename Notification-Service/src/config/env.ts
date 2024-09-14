import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL as string;
const APP_PASS = process.env.APP_PASS as string;
const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE as string;

export { APP_PASS, EMAIL, PORT, RABBITMQ_QUEUE, RABBITMQ_URL };
