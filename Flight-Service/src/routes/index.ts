import { Router } from "express";
import { airplaneRouter } from "./AirplaneRoute";
import { airportRouter } from "./AirportRoute";
import { cityRouter } from "./CityRoute";
import { flightRouter } from "./FlightRoute";

const v1Router = Router();

v1Router.use("/airplanes", airplaneRouter);
v1Router.use("/cities", cityRouter);
v1Router.use("/airports", airportRouter);
v1Router.use("/flights", flightRouter);

export { v1Router };
