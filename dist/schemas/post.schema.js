import * as z from "zod";
export const postFullSchema = z.object({
    author: z.string(),
    description: z.string(),
    image: z.string(),
    totalLikes: z.number().int().nonnegative(),
});
export const postUpdateSchema = z.object({
    description: z.string().optional(),
    image: z.string().min(1, "Image is required").optional(),
});
//# sourceMappingURL=post.schema.js.map