import * as z from "zod";
export declare const postFullSchema: z.ZodObject<{
    author: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    totalLikes: z.ZodNumber;
}, z.core.$strip>;
export type postFullPayload = z.infer<typeof postFullSchema>;
export declare const postUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type postUpdatePayload = z.infer<typeof postUpdateSchema>;
//# sourceMappingURL=post.schema.d.ts.map