import { Router } from "express";
import { bookingRouter } from "./BookingRoute";

const v1Router = Router();

v1Router.use("/bookings", bookingRouter);

export { v1Router };
