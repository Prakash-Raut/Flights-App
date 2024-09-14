import express from "express";
import { PORT } from "./config/env";
import { connectQueue } from "./config/rabbitMqConfig";
import { v1Router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

app.listen(PORT, async () => {
	console.log(`Server is up at PORT: ${PORT}`);
	await connectQueue();
});
