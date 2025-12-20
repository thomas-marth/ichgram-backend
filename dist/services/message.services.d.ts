import { Types } from "mongoose";
import { MessageDocument } from "../db/models/Message.js";
export declare const buildConversationId: (a: Types.ObjectId | string, b: Types.ObjectId | string) => string;
export declare const getMessagesWithUser: (currentUserId: string, targetUserId: string) => Promise<MessageDocument[]>;
export declare const createMessage: (senderId: string, recipientId: string, text: string) => Promise<MessageDocument>;
export declare const formatMessageResponse: (message: MessageDocument) => {
    id: string;
    from: string;
    to: string;
    text: string;
    createdAt: Date;
};
export declare const getLastMessagesForUser: (userId: string) => Promise<{
    userId: any;
    text: any;
    createdAt: any;
}[]>;
//# sourceMappingURL=message.services.d.ts.map