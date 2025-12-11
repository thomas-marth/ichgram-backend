import { Router } from "express";
import {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  refreshController,
} from "../controllers/auth.controller.js";
import authenticate from "./../middlewares/authenticate.js";

const authRouter: Router = Router();

authRouter.post("/signup", registerController);

authRouter.post("/login", loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.post("/refresh", refreshController);

export default authRouter;
