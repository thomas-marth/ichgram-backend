import { followUser, getUserFollowers, getUserFollowing, unfollowUser, } from "../services/follow.services.js";
import HttpError from "../utils/HttpError.js";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
export const getUserFollowersController = async (req, res) => {
    const { userId } = req.params;
    if (!userId)
        throw HttpError(400, "User ID is required");
    const followers = await getUserFollowers(userId);
    res.status(200).json(followers);
};
export const getUserFollowingController = async (req, res) => {
    const { userId } = req.params;
    if (!userId)
        throw HttpError(400, "User ID is required");
    const following = await getUserFollowing(userId);
    res.status(200).json(following);
};
export const followUserController = async (req, res) => {
    const { targetUserId } = req.params;
    const followerId = getUserIdFromToken(req);
    if (!targetUserId)
        throw HttpError(400, "Target user ID is required");
    const follow = await followUser(followerId, targetUserId);
    res.status(201).json(follow);
};
export const unfollowUserController = async (req, res) => {
    const { targetUserId } = req.params;
    const followerId = getUserIdFromToken(req);
    if (!targetUserId)
        throw HttpError(400, "Target user ID is required");
    await unfollowUser(followerId, targetUserId);
    res.status(200).json({ message: "Unfollowed successfully" });
};
//# sourceMappingURL=follow.controllers.js.map