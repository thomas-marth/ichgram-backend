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
export declare const createTokens: (id: Types.ObjectId) => {
    accessToken: string;
    refreshToken: string;
};
type UserQuery = Parameters<(typeof User)["findOne"]>[0];
export declare const findUser: (query: UserQuery) => Promise<UserFindResult>;
export declare const registerUser: (payload: RegisterPayload) => Promise<UserDocument>;
export declare const loginUser: (payload: LoginPayload) => Promise<LoginResult>;
export {};
//# sourceMappingURL=auth.services.d.ts.map