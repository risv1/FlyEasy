import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().length(36),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;