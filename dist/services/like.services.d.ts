import { Types } from "mongoose";
export declare const getPostLikes: (postId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Like.js").LikeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Like.js").LikeDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const addLikeToPost: (postId: string, userId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Like.js").LikeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Like.js").LikeDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const removeLikeFromPost: (postId: string, userId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Like.js").LikeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Like.js").LikeDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getUserLikedPosts: (userId: string) => Promise<Types.ObjectId[]>;
//# sourceMappingURL=like.services.d.ts.map