import { Request, Response, RequestHandler } from "express";
import { AuthRequest } from "../types/interface.js";
export declare const registerController: (req: Request, res: Response) => Promise<void>;
export declare const loginController: RequestHandler;
export declare const getCurrentController: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map