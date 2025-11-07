/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import type { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';

export interface UpdateProductUseCaseInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: UpdateProductUseCaseInput): Promise<ProductEntity> {
    const { id, name, description, price, stock } = input;

    // Check if product exists
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;

    // Update product
    return this.productRepository.update(id, updateData);
  }
}
