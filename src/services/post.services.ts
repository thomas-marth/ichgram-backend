import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { Types } from "mongoose";

import Follow from "../db/models/Follow.js";
import Post from "../db/models/Post.js";
import User from "../db/models/User.js";
import HttpError from "../utils/HttpError.js";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const PUBLIC_AUTHOR_FIELDS = "username avatar";

const uploadImageToCloudinary = async (fileBuffer: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      reject(HttpError(500, "Cloudinary credentials are not configured"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(HttpError(500, "Error uploading image to Cloudinary"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });

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

  if (description !== undefined) post.description = description;

  if (imageBuffer) {
    post.image = await uploadImageToCloudinary(imageBuffer);
  }

  await post.save();
  return post;
};

export const getPostsByUserId = (userId: string) => getPostsByAuthor(userId);

export const getFollowingFeedPosts = async (userId: Types.ObjectId) => {
  const followingUsers = await Follow.find({ follower: userId }).select(
    "following",
  );
  const followingIds = followingUsers.map(({ following }) => following);

  if (!followingIds.length) return [];

  return Post.find({ author: { $in: followingIds } })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ createdAt: -1 });
};

export const getExplorePosts = async (userId?: Types.ObjectId) => {
  if (!userId)
    return Post.find({})
      .populate("author", PUBLIC_AUTHOR_FIELDS)
      .sort({ totalLikes: -1 });

  const followingUsers = await Follow.find({ follower: userId }).select(
    "following",
  );
  const followingIds = followingUsers.map(({ following }) => following);

  const nonFollowedPosts = await Post.find({
    author: { $nin: followingIds },
  })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ totalLikes: -1 });

  if (!followingIds.length) return nonFollowedPosts;

  const followedPosts = await Post.find({ author: { $in: followingIds } })
    .populate("author", PUBLIC_AUTHOR_FIELDS)
    .sort({ totalLikes: -1 });

  return [...nonFollowedPosts, ...followedPosts];
};
