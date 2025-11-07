import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { OrderEntity } from '../../entities/order.entity';
import { OrderRepository } from '@/infrastructure/database/repositories/order.repository';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';

export interface CreateOrderUseCaseInput {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(input: CreateOrderUseCaseInput): Promise<OrderEntity> {
    const { userId, items } = input;

    // Validate products and calculate total
    let total = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] =
      [];

    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }

      if (!product.canFulfillQuantity(item.quantity)) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order
    const order = await this.orderRepository.create({
      userId,
      total,
      items: orderItems,
    });

    // Update product stock
    for (const item of items) {
      await this.productRepository.updateStock(item.productId, item.quantity);
    }

    return order;
  }
}
