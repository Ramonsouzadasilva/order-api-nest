import { Injectable } from '@nestjs/common';
import type { OrderEntity } from '../../entities/order.entity';
import { UserRole } from '@prisma/client';
import { OrderRepository } from '@/infrastructure/database/repositories/order.repository';

export interface GetOrdersUseCaseInput {
  userId: string;
  userRole: UserRole;
}

@Injectable()
export class GetOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: GetOrdersUseCaseInput): Promise<OrderEntity[]> {
    const { userId, userRole } = input;

    // Admins can see all orders, users can only see their own
    if (userRole === 'ADMIN') {
      return this.orderRepository.findAll();
    } else {
      return this.orderRepository.findByUserId(userId);
    }
  }
}
