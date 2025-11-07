import { Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from '../../core/use-cases/orders/create-order.use-case';
import { GetOrdersUseCase } from '../../core/use-cases/orders/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../core/use-cases/orders/get-order-by-id.use-case';
import { UpdateOrderStatusUseCase } from '../../core/use-cases/orders/update-order-status.use-case';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
} from '../../presentation/dtos/order.dto';
import { OrderEntity } from '../../core/entities/order.entity';
import { UserRole } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    return this.createOrderUseCase.execute({ userId, ...createOrderDto });
  }

  async findAll(userId: string, userRole: UserRole): Promise<OrderEntity[]> {
    return this.getOrdersUseCase.execute({ userId, userRole });
  }

  async findOne(
    id: string,
    userId: string,
    userRole: UserRole,
  ): Promise<OrderEntity> {
    return this.getOrderByIdUseCase.execute({ id, userId, userRole });
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderEntity> {
    return this.updateOrderStatusUseCase.execute({
      id,
      ...updateOrderStatusDto,
    });
  }
}
