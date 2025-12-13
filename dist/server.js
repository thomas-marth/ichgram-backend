import express from "express";
import cors from "cors";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routers/auth.router.js";
import postRouter from "./routers/post.router.js";
import likeRouter from "./routers/like.router.js";
import followRouter from "./routers/follow.router.js";
import commentRouter from "./routers/comment.router.js";
const startServer = () => {
    const app = express();
    const port = Number(process.env.PORT) || 3000;
    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", authRouter);
    app.use("/api/posts", postRouter);
    app.use("/api/likes", likeRouter);
    app.use("/api/follows", followRouter);
    app.use("/api/comments", commentRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(port, () => console.log(`Server running on port ${port}`));
};
export default startServer;
//# sourceMappingURL=server.js.map