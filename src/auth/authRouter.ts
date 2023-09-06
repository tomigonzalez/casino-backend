import { Router } from "express";
import * as controllers from "./authControllers";

export const authRouter = Router();

authRouter.post("/register", controllers.registerController);
authRouter.post("/login", controllers.loginController);
authRouter.post("/refresh", controllers.refreshTokenController);
