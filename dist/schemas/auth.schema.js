import * as z from "zod";
import { passwordRegexp, emailRegexp, usernameRegexp, fullnameRegexp, } from "../constants/auth.constants.js";
export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must have at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .regex(usernameRegexp, "Username can include letters, numbers, . and _, and cannot start with . or _"),
    fullname: z
        .string()
        .min(3, "Fullname must have at least 3 characters")
        .max(50, "Fullname must not exceed 50 characters")
        .regex(fullnameRegexp, "Fullname can include letters, numbers, . and _, and cannot start with . or _"),
    email: z
        .string()
        .min(1, "Email is required")
        .regex(emailRegexp, "Email must contain @ and not contain spacces"),
    password: z
        .string()
        .min(8, "Password must have at least 8 characters")
        .regex(passwordRegexp, "Password must include 1 uppercase letter, 1 digit and 1 special character"),
});
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email or username is required")
        .refine((value) => emailRegexp.test(value) || usernameRegexp.test(value), {
        message: "Must be a valid email or username",
    }),
    password: z
        .string()
        .min(8, "Password must have at least 8 characters")
        .regex(passwordRegexp, "Password must include 1 uppercase letter, 1 digit and 1 special character"),
});
export const resetSchema = z.object({
    emailOrUsername: z
        .string()
        .min(1, "Email or username is required")
        .refine((value) => emailRegexp.test(value) || usernameRegexp.test(value), {
        message: "Must be a valid email or username",
    }),
});
//# sourceMappingURL=auth.schema.js.map