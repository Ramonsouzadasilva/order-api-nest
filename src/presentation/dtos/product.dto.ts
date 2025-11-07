import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0.01, { message: 'Price must be greater than 0' })
  @Max(999999.99, { message: 'Price must not exceed 999,999.99' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  @Max(999999, { message: 'Stock must not exceed 999,999' })
  stock: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0.01, { message: 'Price must be greater than 0' })
  @Max(999999.99, { message: 'Price must not exceed 999,999.99' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  @Max(999999, { message: 'Stock must not exceed 999,999' })
  stock?: number;
}

export class ProductResponseDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
