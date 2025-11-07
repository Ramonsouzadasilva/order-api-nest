import type { ProductEntity } from './product.entity';
import type { OrderEntity } from './order.entity';

export class OrderItemEntity {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  order?: OrderEntity;
  product?: ProductEntity;

  constructor(partial: Partial<OrderItemEntity>) {
    Object.assign(this, partial);
  }

  getSubtotal(): number {
    return this.price * this.quantity;
  }
}
