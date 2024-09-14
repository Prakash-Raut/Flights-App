import { Router } from "express";
import {
	getCurrentUser,
	loginUser,
	registerUser,
} from "../controllers/UserController";
import { verifyJWT } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/signup", registerUser);

userRouter.post("/signin", loginUser);

userRouter.get("/current-user", verifyJWT, getCurrentUser);

export { userRouter };
