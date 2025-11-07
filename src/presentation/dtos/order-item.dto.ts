import { IsString, IsNumber, Min, Max } from 'class-validator';

export class OrderItemDto {
  @IsString({ message: 'Product ID must be a string' })
  productId: string;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(999, { message: 'Quantity must not exceed 999' })
  quantity: number;
}
