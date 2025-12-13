import { Document, Types } from "mongoose";
export interface FollowDocument extends Document {
    user_id: Types.ObjectId;
    follower: Types.ObjectId;
    following: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Follow: import("mongoose").Model<FollowDocument, {}, {}, {}, Document<unknown, {}, FollowDocument, {}, import("mongoose").DefaultSchemaOptions> & FollowDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, FollowDocument>;
export default Follow;
//# sourceMappingURL=Follow.d.ts.map