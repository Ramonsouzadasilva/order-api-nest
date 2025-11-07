import { Injectable } from '@nestjs/common';
import type { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}
