import { generateToken } from "./jwt.js";
const createTokens = (id) => {
    const accessToken = generateToken({ id }, { expiresIn: "15M" });
    const refreshToken = generateToken({ id }, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};
export default createTokens;
//# sourceMappingURL=createTokens.js.map