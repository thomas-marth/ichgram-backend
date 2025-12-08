import { Request } from "express";
import { UserDocument } from "../db/models/User.js";
export interface ResponseError extends Error {
    status: number;
}
export interface AuthRequest extends Request {
    user: UserDocument;
}
//# sourceMappingURL=interface.d.ts.map