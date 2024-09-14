import { Router } from "express";
import {
	createAirport,
	deleteAirport,
	getAirport,
	getAllAirport,
	updateAirport,
} from "../controllers/AirportController";

const airportRouter = Router();

airportRouter.post("/create", createAirport);

airportRouter.get("/", getAllAirport);

airportRouter.get("/:id", getAirport);

airportRouter.put("/update-code", updateAirport);

airportRouter.delete("/:id", deleteAirport);

export { airportRouter };
