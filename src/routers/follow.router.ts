import { Router } from "express";

import {
  followUserController,
  getUserFollowersController,
  getUserFollowingController,
  unfollowUserController,
} from "../controllers/follow.controllers.js";
import authenticate from "../middlewares/authenticate.js";

const followRouter: Router = Router();

followRouter.get(
  "/:userId/followers",
  authenticate,
  getUserFollowersController,
);

followRouter.get(
  "/:userId/following",
  authenticate,
  getUserFollowingController,
);

followRouter.post("/:targetUserId", authenticate, followUserController);
followRouter.delete("/:targetUserId", authenticate, unfollowUserController);

export default followRouter;
