import { Router } from "express";
import { emailRouter } from "./emailRoute";

const v1Router = Router();

v1Router.use("/emails", emailRouter);

export { v1Router };
