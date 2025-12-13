import { Document, Types } from "mongoose";
export interface LikeDocument extends Document {
    post: Types.ObjectId;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Like: import("mongoose").Model<LikeDocument, {}, {}, {}, Document<unknown, {}, LikeDocument, {}, import("mongoose").DefaultSchemaOptions> & LikeDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, LikeDocument>;
export default Like;
//# sourceMappingURL=Like.d.ts.map