import Comment from "../db/models/Comment.js";
import Post from "../db/models/Post.js";
import HttpError from "../utils/HttpError.js";
import { createNotification, removeNotification, } from "./notification.services.js";
const PUBLIC_USER_FIELDS = "username avatar";
const ensurePostExists = async (postId) => {
    const post = await Post.findById(postId);
    if (!post)
        throw HttpError(404, "Post not found");
    return post;
};
export const getPostComments = async (postId) => {
    await ensurePostExists(postId);
    return Comment.find({ post: postId })
        .populate("user", PUBLIC_USER_FIELDS)
        .sort({ createdAt: -1 });
};
export const createComment = async (postId, userId, text) => {
    const post = await ensurePostExists(postId);
    const comment = await Comment.create({
        post: post._id,
        user: userId,
        text,
    });
    await Post.findByIdAndUpdate(post._id, { $inc: { totalComments: 1 } });
    await createNotification({
        recipient: post.author,
        actor: userId,
        type: "comment_post",
        post: post._id,
        comment: comment._id,
    });
    return comment.populate("user", PUBLIC_USER_FIELDS);
};
export const deleteComment = async (commentId, requesterId) => {
    const comment = await Comment.findById(commentId);
    if (!comment)
        throw HttpError(404, "Comment not found");
    if (comment.user.toString() !== requesterId.toString())
        throw HttpError(403, "You are not allowed to delete this comment");
    await comment.deleteOne();
    await Post.findByIdAndUpdate(comment.post, { $inc: { totalComments: -1 } });
};
export const toggleCommentLike = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment)
        throw HttpError(404, "Comment not found");
    const userIdStr = userId.toString();
    const hasLiked = comment.likes.some((id) => id.toString() === userIdStr);
    if (hasLiked) {
        comment.likes = comment.likes.filter((id) => id.toString() !== userIdStr);
    }
    else {
        comment.likes.push(userId);
    }
    await comment.save();
    const recipientId = comment.user;
    const notificationPayload = {
        recipient: recipientId,
        actor: userId,
        type: "like_comment",
        post: comment.post,
        comment: comment._id,
    };
    if (hasLiked) {
        await removeNotification(notificationPayload);
    }
    else {
        await createNotification(notificationPayload);
    }
    return { comment, isLiked: !hasLiked };
};
//# sourceMappingURL=comment.services.js.map