import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const updateUserSchema = z.object({
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
  role: z
    .enum([UserRole.ADMIN, UserRole.USER], {
      message: 'Role must be either ADMIN or USER',
    })
    .optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
