import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../types/interface.js";
declare const errorHandler: (error: ResponseError, _: Request, res: Response, __: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map