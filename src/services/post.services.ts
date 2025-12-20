import { Types } from "mongoose";

import Follow from "../db/models/Follow.js";
import Post, { PostDocument } from "../db/models/Post.js";
import User from "../db/models/User.js";
import Comment from "../db/models/Comment.js";
import HttpError from "../utils/HttpError.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

const PUBLIC_AUTHOR_FIELDS = "username avatar";

const uploadImageToCloudinary = (fileBuffer: Buffer) =>
  uploadBufferToCloudinary(fileBuffer);

const getPostsByAuthor = (authorId: Types.ObjectId | string) =>
  Post.find({ author: authorId })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ createdAt: -1 });

export const getCurrentUserPosts = (userId: Types.ObjectId) =>
  getPostsByAuthor(userId);

export const createPost = async (
  author: Types.ObjectId,
  description: string,
  imageBuffer: Buffer,
) => {
  const user = await User.findById(author);
  if (!user) throw HttpError(404, "User not found");

  const imageUrl = await uploadImageToCloudinary(imageBuffer);

  const post = await Post.create({
    author,
    description,
    image: imageUrl,
  });

  await User.findByIdAndUpdate(author, { $inc: { totalPosts: 1 } });

  return post;
};

export const deletePost = async (
  postId: string,
  requesterId: Types.ObjectId,
) => {
  const post = await Post.findById(postId);
  if (!post) throw HttpError(404, "Post not found");
  if (post.author.toString() !== requesterId.toString())
    throw HttpError(403, "You are not allowed to delete this post");

  await Post.findByIdAndDelete(postId);
  await User.findByIdAndUpdate(post.author, { $inc: { totalPosts: -1 } });
};

export const getPostById = async (postId: string) => {
  const post = await Post.findById(postId).populate(
    "author",
    PUBLIC_AUTHOR_FIELDS,
  );
  if (!post) throw HttpError(404, "Post not found");
  return post;
};

const mapPostToResponse = (post: Awaited<ReturnType<typeof getPostById>>) => {
  const { _id, description, ...rest } = post.toObject();

  return {
    ...rest,
    id: String(_id),
    description,
    descriptionBody: description,
    captionBody: description,
  };
};

export const updatePost = async (
  postId: string,
  userId: Types.ObjectId,
  description?: string,
  imageBuffer?: Buffer,
) => {
  const post = await Post.findById(postId);
  if (!post) throw HttpError(404, "Post not found");
  if (post.author.toString() !== userId.toString())
    throw HttpError(403, "You are not allowed to edit this post");

  const updates: Partial<PostDocument> = {};

  if (description !== undefined) updates.description = description;

  if (imageBuffer) {
    updates.image = await uploadImageToCloudinary(imageBuffer);
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, updates).populate(
    "author",
    PUBLIC_AUTHOR_FIELDS,
  );

  if (!updatedPost) throw HttpError(500, "Failed to update post");

  return mapPostToResponse(updatedPost);
};

export const getPostsByUserId = (userId: string) => getPostsByAuthor(userId);

export const getFollowingFeedPosts = async (userId: Types.ObjectId) => {
  const followingUsers = await Follow.find({ follower: userId }).select(
    "following",
  );
  const followingIds = followingUsers.map(({ following }) => following);

  if (!followingIds.length) return [];

  const posts = await Post.find({ author: { $in: followingIds } })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ createdAt: -1 });

  const postIds = posts.map((post) => post._id);

  const commentsCounts = await Comment.aggregate([
    { $match: { post: { $in: postIds } } },
    { $group: { _id: "$post", total: { $sum: 1 } } },
  ]);

  const commentsCountMap = new Map(
    commentsCounts.map(({ _id, total }) => [String(_id), total]),
  );

  return posts.map((post) => {
    const commentCount = commentsCountMap.get(String(post._id));

    return {
      ...post.toObject(),
      totalComments: commentCount ?? post.totalComments ?? 0,
    };
  });
};

export const getExplorePosts = async (userId?: Types.ObjectId) => {
  if (!userId)
    return Post.find({})
      .populate("author", PUBLIC_AUTHOR_FIELDS)
      .sort({ totalLikes: -1 });

  const userIdString = userId.toString();

  const followingUsers = await Follow.find({ follower: userId }).select(
    "following",
  );
  const followingIds = followingUsers
    .map(({ following }) => following)
    .filter(Boolean);
  const followingWithoutSelf = followingIds.filter(
    (id) => id.toString() !== userIdString,
  );
  const excludedAuthorIds = [userId, ...followingWithoutSelf];

  const nonFollowedPosts = await Post.find({
    author: { $nin: excludedAuthorIds },
  })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ totalLikes: -1 });

  if (!followingWithoutSelf.length) return nonFollowedPosts;

  const followedPosts = await Post.find({
    author: { $in: followingWithoutSelf },
  })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ totalLikes: -1 });

  return [...nonFollowedPosts, ...followedPosts];
};
