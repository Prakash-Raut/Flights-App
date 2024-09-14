import { Router } from "express";
import { createEmail } from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/create", createEmail);

export { emailRouter };
