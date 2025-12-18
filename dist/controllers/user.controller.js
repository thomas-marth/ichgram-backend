import multer from "multer";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import HttpError from "../utils/HttpError.js";
import { getAllUsers, getUserProfile, updateUserProfile, } from "../services/user.services.js";
const storage = multer.memoryStorage();
export const uploadProfileImage = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
export const getUserProfileController = async (req, res) => {
    const { userId } = req.params;
    if (!userId)
        throw HttpError(400, "User ID is required");
    const viewerId = req.get("Authorization")
        ? getUserIdFromToken(req)
        : undefined;
    const user = await getUserProfile(userId, viewerId);
    res.status(200).json(user);
};
export const updateUserProfileController = async (req, res) => {
    const typedReq = req;
    const userId = getUserIdFromToken(typedReq);
    const { username, fullname, about, website } = typedReq.body;
    const updatedUser = await updateUserProfile(userId, {
        username,
        fullname,
        about,
        website,
        avatarBuffer: typedReq.file?.buffer,
    });
    res.status(200).json(updatedUser);
};
export const getAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json(users);
};
//# sourceMappingURL=user.controller.js.map