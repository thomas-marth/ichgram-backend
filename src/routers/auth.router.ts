import { Router } from "express";
import {
  registerController,
  loginController,
  getCurrentController,
} from "../controllers/auth.controller.js";
import authenticate from "./../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/signup", registerController);

authRouter.post("/login", loginController);

authRouter.get("/current", authenticate, getCurrentController);

export default authRouter;
