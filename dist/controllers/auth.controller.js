import validateBody from "./../utils/validateBody.js";
import { registerUser, loginUser,
// resetPassword,
 } from "./../services/auth.services.js";
import { registerSchema, loginSchema,
// resetSchema,
 } from "./../schemas/auth.schema.js";
import { createTokens } from "./../services/auth.services.js";
import HttpError from "../utils/HttpError.js";
export const registerController = async (req, res) => {
    validateBody(registerSchema, req.body);
    await registerUser(req.body);
    res.status(201).json({ message: "User register successfully" });
};
export const loginController = async (req, res) => {
    validateBody(loginSchema, req.body);
    const result = await loginUser(req.body);
    res.status(200).json(result);
};
export const getCurrentController = async (req, res) => {
    if (!req.user)
        throw HttpError(401, "User not authenticated");
    const { accessToken, refreshToken } = createTokens(req.user._id);
    res.json({
        accessToken,
        refreshToken,
        user: {
            email: req.user.email,
            username: req.user.username,
        },
    });
};
//# sourceMappingURL=auth.controller.js.map