import { Document } from "mongoose";
export interface UserDocument extends Document {
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    about?: string;
    website?: string;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: import("mongoose").Model<UserDocument, {}, {}, {}, Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & UserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, UserDocument>;
export default User;
//# sourceMappingURL=User.d.ts.map