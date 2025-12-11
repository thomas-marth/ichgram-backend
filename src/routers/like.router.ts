import { Router } from "express";

import {
  getPostLikesController,
  getUserLikesController,
  likePostController,
  unlikePostController,
} from "../controllers/like.controllers.js";
import authenticate from "../middlewares/authenticate.js";

const likeRouter: Router = Router();

likeRouter.get("/user/:userId", getUserLikesController);
likeRouter.get("/:postId/likes", authenticate, getPostLikesController);
likeRouter.post("/:postId/like", authenticate, likePostController);
likeRouter.delete("/:postId/unlike", authenticate, unlikePostController);

export default likeRouter;
