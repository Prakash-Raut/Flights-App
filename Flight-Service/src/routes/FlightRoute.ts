import { Router } from "express";
import {
	createFlight,
	deleteFlight,
	getAllFlight,
	getFlight,
	updateFlight,
} from "../controllers/FlightController";

const flightRouter = Router();

flightRouter.post("/create", createFlight);

flightRouter.get("/", getAllFlight);

flightRouter.get("/:id", getFlight);

flightRouter.put("/:id", updateFlight);

flightRouter.delete("/:id", deleteFlight);

export { flightRouter };
