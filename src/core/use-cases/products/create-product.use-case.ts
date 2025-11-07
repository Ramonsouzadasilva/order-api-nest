import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';

export interface CreateProductUseCaseInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductUseCaseInput): Promise<ProductEntity> {
    const { name, description, price, stock } = input;

    const product = await this.productRepository.create({
      name,
      description,
      price,
      stock,
    });

    return product;
  }
}
