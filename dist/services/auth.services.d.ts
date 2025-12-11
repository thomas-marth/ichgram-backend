import { Types } from "mongoose";
import { RegisterPayload, LoginPayload } from "../schemas/auth.schema.js";
import User, { UserDocument } from "../db/models/User.js";
export type UserFindResult = UserDocument | null;
export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        username: string;
    };
}
type UserQuery = Parameters<(typeof User)["findOne"]>[0];
export declare const findUser: (query: UserQuery) => Promise<UserFindResult>;
export declare const registerUser: (payload: RegisterPayload) => Promise<UserDocument>;
export declare const loginUser: (payload: LoginPayload) => Promise<LoginResult>;
export declare const logoutUser: (userId: Types.ObjectId) => Promise<void>;
export declare const refreshUser: (refreshTokenOld: string) => Promise<LoginResult>;
export {};
//# sourceMappingURL=auth.services.d.ts.map