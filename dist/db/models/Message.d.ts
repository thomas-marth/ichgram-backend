import { Document, Types } from "mongoose";
export interface MessageDocument extends Document {
    from: Types.ObjectId;
    to: Types.ObjectId;
    text: string;
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Message: import("mongoose").Model<MessageDocument, {}, {}, {}, Document<unknown, {}, MessageDocument, {}, import("mongoose").DefaultSchemaOptions> & MessageDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, MessageDocument>;
export default Message;
//# sourceMappingURL=Message.d.ts.map