import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { OrderEntity } from '../../entities/order.entity';
import { UserRole } from '@prisma/client';
import { OrderRepository } from '@/infrastructure/database/repositories/order.repository';

export interface GetOrderByIdUseCaseInput {
  id: string;
  userId: string;
  userRole: UserRole;
}

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: GetOrderByIdUseCaseInput): Promise<OrderEntity> {
    const { id, userId, userRole } = input;

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Users can only see their own orders, admins can see all
    if (userRole !== 'ADMIN' && order.userId !== userId) {
      throw new ForbiddenException('You can only access your own orders');
    }

    return order;
  }
}
