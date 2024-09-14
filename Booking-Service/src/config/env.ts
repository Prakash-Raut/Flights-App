import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT);
export const RABBITMQ_QUEUE = String(process.env.RABBITMQ_QUEUE);
export const RABBITMQ_URL = String(process.env.RABBITMQ_URL);
