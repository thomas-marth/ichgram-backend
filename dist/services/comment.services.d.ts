import { Types } from "mongoose";
export declare const getPostComments: (postId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Comment.js").CommentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Comment.js").CommentDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const createComment: (postId: string, userId: Types.ObjectId, text: string) => Promise<Omit<import("mongoose").Document<unknown, {}, import("../db/models/Comment.js").CommentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Comment.js").CommentDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, never>>;
export declare const deleteComment: (commentId: string, requesterId: Types.ObjectId) => Promise<void>;
export declare const toggleCommentLike: (commentId: string, userId: Types.ObjectId) => Promise<{
    comment: import("mongoose").Document<unknown, {}, import("../db/models/Comment.js").CommentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Comment.js").CommentDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    };
    isLiked: boolean;
}>;
//# sourceMappingURL=comment.services.d.ts.map