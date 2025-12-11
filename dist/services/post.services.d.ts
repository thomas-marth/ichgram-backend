import { Types } from "mongoose";
export declare const getCurrentUserPosts: (userId: Types.ObjectId) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[], import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../db/models/Post.js").PostDocument, "find", {}>;
export declare const createPost: (author: Types.ObjectId, description: string, imageBuffer: Buffer) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const deletePost: (postId: string, requesterId: Types.ObjectId) => Promise<void>;
export declare const getPostById: (postId: string) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const updatePost: (postId: string, userId: Types.ObjectId, description?: string, imageBuffer?: Buffer) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getPostsByUserId: (userId: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[], import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../db/models/Post.js").PostDocument, "find", {}>;
export declare const getFollowingFeedPosts: (userId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const getExplorePosts: (userId?: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Post.js").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Post.js").PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
//# sourceMappingURL=post.services.d.ts.map