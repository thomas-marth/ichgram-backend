import Message from "../db/models/Message.js";
import Follow from "../db/models/Follow.js";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";
export const buildConversationId = (a, b) => [a.toString(), b.toString()].sort().join(":");
const ensureRecipientIsFollowed = async (senderId, recipientId) => {
    const follow = await Follow.findOne({
        follower: senderId,
        following: recipientId,
    });
    if (!follow)
        throw HttpError(403, "You can only message users you follow");
};
const ensureUserExists = async (userId) => {
    const exists = await User.exists({ _id: userId });
    if (!exists)
        throw HttpError(404, "User not found");
};
export const getMessagesWithUser = async (currentUserId, targetUserId) => {
    if (currentUserId === targetUserId)
        throw HttpError(400, "Cannot fetch conversation with yourself");
    await ensureUserExists(targetUserId);
    await ensureRecipientIsFollowed(currentUserId, targetUserId);
    const conversationId = buildConversationId(currentUserId, targetUserId);
    return Message.find({ conversationId }).sort({ createdAt: 1 }).limit(500);
};
export const createMessage = async (senderId, recipientId, text) => {
    const trimmedText = text.trim();
    if (!trimmedText)
        throw HttpError(400, "Message text is required");
    await ensureUserExists(recipientId);
    await ensureRecipientIsFollowed(senderId, recipientId);
    const conversationId = buildConversationId(senderId, recipientId);
    return Message.create({
        from: senderId,
        to: recipientId,
        text: trimmedText,
        conversationId,
    });
};
export const formatMessageResponse = (message) => ({
    id: message._id.toString(),
    from: message.from.toString(),
    to: message.to.toString(),
    text: message.text,
    createdAt: message.createdAt,
});
//# sourceMappingURL=message.services.js.map