import { Request, Response, NextFunction } from "express";

import { ResponseError } from "../types/interface.js";

const errorHandler = (
  error: ResponseError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    message,
  });
};

export default errorHandler;
