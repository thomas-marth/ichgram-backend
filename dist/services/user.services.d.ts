import { Types } from "mongoose";
export declare const getUserProfile: (userId: string, viewerId?: Types.ObjectId) => Promise<{
    isFollowed: boolean;
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    about: string;
    website: string;
    accessToken?: string;
    refreshToken?: string;
    followers: number;
    following: number;
    totalPosts: number;
    createdAt: Date;
    updatedAt: Date;
    _id: Types.ObjectId;
    $locals: Record<string, unknown>;
    $op: "save" | "validate" | "remove" | null;
    $where: Record<string, unknown>;
    baseModelName?: string;
    collection: import("mongoose").Collection;
    db: import("mongoose").Connection;
    errors?: import("mongoose").Error.ValidationError;
    isNew: boolean;
    schema: import("mongoose").Schema;
    __v: number;
}>;
interface UpdateUserPayload {
    username?: string | undefined;
    fullname?: string | undefined;
    about?: string | undefined;
    website?: string | undefined;
    avatarBuffer?: Buffer | undefined;
}
export declare const updateUserProfile: (userId: Types.ObjectId, { username, fullname, about, website, avatarBuffer }: UpdateUserPayload) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/User.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/User.js").UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getAllUsers: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../db/models/User.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/User.js").UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[], import("mongoose").Document<unknown, {}, import("../db/models/User.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/User.js").UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../db/models/User.js").UserDocument, "find", {}>;
export {};
//# sourceMappingURL=user.services.d.ts.map