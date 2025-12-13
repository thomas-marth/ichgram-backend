import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getAllUsersController, getUserProfileController, updateUserProfileController, uploadProfileImage, } from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.get("/", getAllUsersController);
userRouter.get("/:userId", getUserProfileController);
userRouter.put("/current", authenticate, uploadProfileImage.single("avatar"), updateUserProfileController);
export default userRouter;
//# sourceMappingURL=user.router.js.map