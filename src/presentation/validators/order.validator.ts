import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .max(999, 'Quantity must not exceed 999'),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, 'Order must contain at least one item')
    .max(50, 'Order cannot contain more than 50 items'),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus, {
    message: 'Status must be a valid order status',
  }),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
