/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { UserEntity } from './user.entity';
import type { OrderItemEntity } from './order-item.entity';
import { OrderStatus } from '@prisma/client';

export class OrderEntity {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
  items?: OrderItemEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }

  isPending(): boolean {
    return this.status === 'PENDING';
  }

  isProcessing(): boolean {
    return this.status === 'PROCESSING';
  }

  isShipped(): boolean {
    return this.status === 'SHIPPED';
  }

  isDelivered(): boolean {
    return this.status === 'DELIVERED';
  }

  isCancelled(): boolean {
    return this.status === 'CANCELLED';
  }

  canBeCancelled(): boolean {
    return this.status === 'PENDING' || this.status === 'PROCESSING';
  }

  getTotalItems(): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }
}
