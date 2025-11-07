import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IOrderRepository,
  CreateOrderData,
} from '../../../core/repositories/order.repository.interface';
import { OrderEntity } from '../../../core/entities/order.entity';
import { OrderItemEntity } from '../../../core/entities/order-item.entity';
import { UserEntity } from '../../../core/entities/user.entity';
import { ProductEntity } from '../../../core/entities/product.entity';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderData): Promise<OrderEntity> {
    const order = await this.prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        items: {
          create: data.items,
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return new OrderEntity({
      ...order,
      user: order.user ? new UserEntity(order.user) : undefined,
      items: order.items.map(
        (item) =>
          new OrderItemEntity({
            ...item,
            product: item.product ? new ProductEntity(item.product) : undefined,
          }),
      ),
    });
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) return null;

    return new OrderEntity({
      ...order,
      user: order.user ? new UserEntity(order.user) : undefined,
      items: order.items.map(
        (item) =>
          new OrderItemEntity({
            ...item,
            product: item.product ? new ProductEntity(item.product) : undefined,
          }),
      ),
    });
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map(
      (order) =>
        new OrderEntity({
          ...order,
          user: order.user ? new UserEntity(order.user) : undefined,
          items: order.items.map(
            (item) =>
              new OrderItemEntity({
                ...item,
                product: item.product
                  ? new ProductEntity(item.product)
                  : undefined,
              }),
          ),
        }),
    );
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map(
      (order) =>
        new OrderEntity({
          ...order,
          user: order.user ? new UserEntity(order.user) : undefined,
          items: order.items.map(
            (item) =>
              new OrderItemEntity({
                ...item,
                product: item.product
                  ? new ProductEntity(item.product)
                  : undefined,
              }),
          ),
        }),
    );
  }

  async updateStatus(id: string, status: OrderStatus): Promise<OrderEntity> {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return new OrderEntity({
      ...order,
      user: order.user ? new UserEntity(order.user) : undefined,
      items: order.items.map(
        (item) =>
          new OrderItemEntity({
            ...item,
            product: item.product ? new ProductEntity(item.product) : undefined,
          }),
      ),
    });
  }
}
