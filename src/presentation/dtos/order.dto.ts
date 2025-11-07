import { IsArray, IsEnum, ValidateNested, ArrayMinSize } from 'class-validator';
import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsArray({ message: 'Items must be an array' })
  @ArrayMinSize(1, { message: 'Order must contain at least one item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, { message: 'Status must be a valid order status' })
  status: OrderStatus;
}

export class OrderResponseDto {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItemDto[];
}
