import { Router } from "express";
import {
	createAirplane,
	deleteAirplane,
	getAirplane,
	getAllAirplane,
	updateAirplane,
} from "../controllers/AirplaneController";

const airplaneRouter = Router();

airplaneRouter.post("/create", createAirplane);

airplaneRouter.get("/", getAllAirplane);

airplaneRouter.get("/:id", getAirplane);

airplaneRouter.put("/:id", updateAirplane);

airplaneRouter.delete("/:id", deleteAirplane);

export { airplaneRouter };
