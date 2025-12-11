import express, { Express } from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routers/auth.router.js";
import postRouter from "./routers/post.router.js";

const startServer = (): void => {
  const app: Express = express();
  const port: number = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default startServer;
