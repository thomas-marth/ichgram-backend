import { Document, Types } from "mongoose";
export interface PostDocument extends Document {
    author: Types.ObjectId;
    description: string;
    image: string;
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Post: import("mongoose").Model<PostDocument, {}, {}, {}, Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & PostDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, PostDocument>;
export default Post;
//# sourceMappingURL=Post.d.ts.map