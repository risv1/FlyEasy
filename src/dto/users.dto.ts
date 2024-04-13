import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().length(36).optional(),
  name: z.string().max(40),
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  role: z.string().optional(),
});

export type UserDto = z.infer<typeof UserSchema>;
