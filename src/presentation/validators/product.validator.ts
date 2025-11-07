import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .transform((val) => val.trim()),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .transform((val) => val.trim())
    .optional(),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price must not exceed 999,999.99'),
  stock: z
    .number()
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .max(999999, 'Stock must not exceed 999,999'),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .transform((val) => val.trim())
    .optional(),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .transform((val) => val.trim())
    .optional(),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price must not exceed 999,999.99')
    .optional(),
  stock: z
    .number()
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .max(999999, 'Stock must not exceed 999,999')
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
