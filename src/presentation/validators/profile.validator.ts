import { z } from 'zod';

export const updateProfileSchema = z.object({
  email: z
    .email('Please provide a valid email address')
    .transform((val) => val.toLowerCase().trim())
    .optional(),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .transform((val) => val.trim())
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must not exceed 100 characters')
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
