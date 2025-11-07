import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface DeleteProductUseCaseInput {
  id: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: DeleteProductUseCaseInput): Promise<void> {
    const { id } = input;

    // Check if product exists
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Optional: Check if product has pending orders
    // This would require checking the order items table
    // For now, we'll allow deletion

    // Delete product
    await this.productRepository.delete(id);
  }
}
