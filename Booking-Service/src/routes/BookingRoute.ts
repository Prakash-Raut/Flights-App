import { Router } from "express";
import { createBooking, makePayment } from "../controllers/BookingController";

const bookingRouter = Router();

bookingRouter.post("/create", createBooking);
bookingRouter.post("/payments", makePayment);

export { bookingRouter };
