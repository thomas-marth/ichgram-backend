import { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
type JWTPayload = {
    id: Types.ObjectId;
};
type JWTSettings = SignOptions | undefined;
interface VerifyTokenResult {
    data: JWTPayload | null;
    error: Error | null;
}
export declare const generateToken: (payload: JWTPayload, settings: JWTSettings) => string;
export declare const verifyToken: (token: string) => VerifyTokenResult;
export {};
//# sourceMappingURL=jwt.d.ts.map