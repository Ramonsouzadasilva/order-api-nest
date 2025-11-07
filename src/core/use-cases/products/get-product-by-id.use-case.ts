import { Injectable, NotFoundException } from '@nestjs/common';
import type { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';

export interface GetProductByIdUseCaseInput {
  id: string;
}

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: GetProductByIdUseCaseInput): Promise<ProductEntity> {
    const { id } = input;

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
