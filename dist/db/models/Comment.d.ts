import { Document, Types } from "mongoose";
export interface CommentDocument extends Document {
    post: Types.ObjectId;
    user: Types.ObjectId;
    text: string;
    likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
declare const Comment: import("mongoose").Model<CommentDocument, {}, {}, {}, Document<unknown, {}, CommentDocument, {}, import("mongoose").DefaultSchemaOptions> & CommentDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, CommentDocument>;
export default Comment;
//# sourceMappingURL=Comment.d.ts.map