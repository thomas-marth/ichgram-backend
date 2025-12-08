import { Types } from "mongoose";
import { RegisterPayload, LoginPayload } from "../schemas/auth.schema.js";
import { UserDocument } from "../db/models/User.js";
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
export declare const findUser: (query: any) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}) | null, import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, {}, UserDocument, "findOne", {}>;
export declare const registerUser: (payload: RegisterPayload) => Promise<UserDocument>;
export declare const loginUser: (payload: LoginPayload) => Promise<LoginResult>;
//# sourceMappingURL=auth.services.d.ts.map