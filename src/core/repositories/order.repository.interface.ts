import { OrderStatus } from '@prisma/client';
import type { OrderEntity } from '../entities/order.entity';

export interface CreateOrderData {
  userId: string;
  total: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface IOrderRepository {
  create(data: CreateOrderData): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  findByUserId(userId: string): Promise<OrderEntity[]>;
  findAll(): Promise<OrderEntity[]>;
  updateStatus(id: string, status: OrderStatus): Promise<OrderEntity>;
}
