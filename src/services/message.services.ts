import { Types } from "mongoose";

import Message, { MessageDocument } from "../db/models/Message.js";
import Follow from "../db/models/Follow.js";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";

export const buildConversationId = (
  a: Types.ObjectId | string,
  b: Types.ObjectId | string,
) => [a.toString(), b.toString()].sort().join(":");

const ensureRecipientIsFollowed = async (
  senderId: string,
  recipientId: string,
) => {
  const follow = await Follow.findOne({
    follower: senderId,
    following: recipientId,
  });
  if (!follow) throw HttpError(403, "You can only message users you follow");
};

const ensureUserExists = async (userId: string) => {
  const exists = await User.exists({ _id: userId });
  if (!exists) throw HttpError(404, "User not found");
};

export const getMessagesWithUser = async (
  currentUserId: string,
  targetUserId: string,
): Promise<MessageDocument[]> => {
  if (currentUserId === targetUserId)
    throw HttpError(400, "Cannot fetch conversation with yourself");

  await ensureUserExists(targetUserId);
  await ensureRecipientIsFollowed(currentUserId, targetUserId);

  const conversationId = buildConversationId(currentUserId, targetUserId);

  return Message.find({ conversationId }).sort({ createdAt: 1 }).limit(500);
};

export const createMessage = async (
  senderId: string,
  recipientId: string,
  text: string,
): Promise<MessageDocument> => {
  const trimmedText = text.trim();
  if (!trimmedText) throw HttpError(400, "Message text is required");

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

export const formatMessageResponse = (message: MessageDocument) => ({
  id: message._id.toString(),
  from: message.from.toString(),
  to: message.to.toString(),
  text: message.text,
  createdAt: message.createdAt,
});

export const getLastMessagesForUser = async (userId: string) => {
  const follows = await Follow.find({ follower: userId });

  const ids = follows.map((f) => f.following.toString());
  if (!ids.length) return [];

  const convoIds = ids.map((otherId) => buildConversationId(userId, otherId));

  const raw = await Message.aggregate([
    { $match: { conversationId: { $in: convoIds } } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$conversationId",
        last: { $first: "$$ROOT" },
      },
    },
  ]);

  return raw.map((r) => ({
    userId:
      r.last.from === userId ? r.last.to.toString() : r.last.from.toString(),
    text: r.last.text,
    createdAt: r.last.createdAt,
  }));
};
