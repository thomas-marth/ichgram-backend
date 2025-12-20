import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment variables");
}
export const generateToken = (payload, settings) => jwt.sign(payload, JWT_SECRET, settings);
export const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET);
        return { data, error: null };
    }
    catch (error) {
        if (error instanceof Error)
            return { data: null, error };
    }
    const resultError = new Error("Token error");
    return { data: null, error: resultError };
};
//# sourceMappingURL=jwt.js.map