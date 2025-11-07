import { Injectable, NotFoundException } from '@nestjs/common';
import type { OrderEntity } from '../../entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { OrderRepository } from '@/infrastructure/database/repositories/order.repository';

export interface UpdateOrderStatusUseCaseInput {
  id: string;
  status: OrderStatus;
}

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: UpdateOrderStatusUseCaseInput): Promise<OrderEntity> {
    const { id, status } = input;

    // Check if order exists
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Update order status
    return this.orderRepository.updateStatus(id, status);
  }
}
