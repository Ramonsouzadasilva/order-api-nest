import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IProductRepository,
  CreateProductData,
  UpdateProductData,
} from '../../../core/repositories/product.repository.interface';
import { ProductEntity } from '../../../core/entities/product.entity';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductData): Promise<ProductEntity> {
    const product = await this.prisma.product.create({
      data,
    });
    return new ProductEntity(product);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? new ProductEntity(product) : null;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return products.map((product) => new ProductEntity(product));
  }

  async update(id: string, data: UpdateProductData): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });
    return new ProductEntity(product);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async updateStock(id: string, quantity: number): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
    return new ProductEntity(product);
  }
}
