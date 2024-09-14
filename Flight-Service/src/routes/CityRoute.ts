import { Router } from "express";
import {
	createCity,
	deleteCity,
	getAllCity,
	getCity,
	updateCity,
} from "../controllers/CityController";

const cityRouter = Router();

cityRouter.post("/create", createCity);

cityRouter.get("/", getAllCity);

cityRouter.get("/:id", getCity);

cityRouter.put("/:id", updateCity);

cityRouter.delete("/:id", deleteCity);

export { cityRouter };
