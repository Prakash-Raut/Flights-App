import express from "express";
import { rateLimit } from "express-rate-limit";
// import { createProxyMiddleware } from "http-proxy-middleware";
import { PORT } from "./config/env";
import { userRouter } from "./routes/UserRoute";

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// reverse proxy
/* app.use(
	"/api",
	createProxyMiddleware({
		target: "http://localhost:5005/",
		changeOrigin: true,
	})
); */

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
	console.log(`Server is up at PORT: ${PORT}`);
});
