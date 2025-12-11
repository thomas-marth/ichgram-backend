import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { createPostController, deletePostController, getCurrentUserPostsController, getExplorePostsController, getFollowingFeedController, getPostByIdController, getPostsByUserIdController, updatePostController, upload, } from "../controllers/post.controllers.js";
const postRouter = Router();
postRouter.get("/explore", getExplorePostsController);
postRouter.get("/my", authenticate, getCurrentUserPostsController);
postRouter.get("/feed", authenticate, getFollowingFeedController);
postRouter.get("/user/:userId", getPostsByUserIdController);
postRouter.get("/:postId", getPostByIdController);
postRouter.post("/", authenticate, upload.single("image"), createPostController);
postRouter.patch("/:postId", authenticate, upload.single("image"), updatePostController);
postRouter.delete("/:postId", authenticate, deletePostController);
export default postRouter;
//# sourceMappingURL=post.router.js.map