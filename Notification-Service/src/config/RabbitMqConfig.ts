import amqplib from "amqplib";
import { RABBITMQ_QUEUE, RABBITMQ_URL } from "./env";

let channel: amqplib.Channel;
let connection: amqplib.Connection;

/*  Connect to the RabbitMQ server */
async function connectQueue() {
	try {
		/*  amqp://localhost is the default URL for the RabbitMQ server. */
		connection = await amqplib.connect(RABBITMQ_URL);

		console.log("Connected to RabbitMQ server successfully 🚀");

		/*  Create a channel to communicate with the RabbitMQ server. */
		channel = await connection.createChannel();

		/*  Assert a queue named "email" to send emails. */
		await channel.assertQueue(RABBITMQ_QUEUE);

		console.log("Channel created successfully 🚀");
	} catch (error) {
		console.log("Error while connecting to the rabbit mq server", error);
		connection.close();
		process.exit(1);
	}
}

/*  Publish the message to the queue. */
async function publishToQueue(data: any) {
	try {
		channel.sendToQueue("email", Buffer.from(JSON.stringify(data)));
	} catch (error) {
		console.log("Error while publishing message to queue", error);
	}
}

export { connectQueue, publishToQueue };
