import * as z from "zod";
export declare const registerSchema: z.ZodObject<{
    username: z.ZodString;
    fullname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginPayload = z.infer<typeof loginSchema>;
export declare const resetSchema: z.ZodObject<{
    emailOrUsername: z.ZodString;
}, z.core.$strip>;
export type ResetPayload = z.infer<typeof resetSchema>;
//# sourceMappingURL=auth.schema.d.ts.map