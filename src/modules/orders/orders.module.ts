/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { OrdersController } from '../../presentation/controllers/orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from '../../infrastructure/database/repositories/order.repository';
import { ProductRepository } from '../../infrastructure/database/repositories/product.repository';
import { CreateOrderUseCase } from '../../core/use-cases/orders/create-order.use-case';
import { GetOrdersUseCase } from '../../core/use-cases/orders/get-orders.use-case';
import { GetOrderByIdUseCase } from '../../core/use-cases/orders/get-order-by-id.use-case';
import { UpdateOrderStatusUseCase } from '../../core/use-cases/orders/update-order-status.use-case';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    OrderRepository,
    ProductRepository,
    CreateOrderUseCase,
    GetOrdersUseCase,
    GetOrderByIdUseCase,
    UpdateOrderStatusUseCase,
  ],
  exports: [OrdersService, OrderRepository],
})
export class OrdersModule {}
