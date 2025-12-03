import { RegisterPayload, LoginPayload } from "../schemas/auth.schema.js";
import { UserDocument } from "../db/models/User.js";
export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        username: string;
    };
}
export declare const registerUser: (payload: RegisterPayload) => Promise<UserDocument>;
export declare const loginUser: (payload: LoginPayload) => Promise<LoginResult>;
//# sourceMappingURL=auth.services.d.ts.map