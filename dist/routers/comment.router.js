import { Router } from "express";
import { createCommentController, deleteCommentController, getPostCommentsController, toggleCommentLikeController, } from "../controllers/comment.controllers.js";
import authenticate from "../middlewares/authenticate.js";
const commentRouter = Router();
commentRouter.get("/post/:postId", authenticate, getPostCommentsController);
commentRouter.post("/post/:postId", authenticate, createCommentController);
commentRouter.delete("/:commentId", authenticate, deleteCommentController);
commentRouter.post("/:commentId/like", authenticate, toggleCommentLikeController);
export default commentRouter;
//# sourceMappingURL=comment.router.js.map