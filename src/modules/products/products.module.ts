/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { ProductsController } from '../../presentation/controllers/products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from '../../infrastructure/database/repositories/product.repository';
import { CreateProductUseCase } from '../../core/use-cases/products/create-product.use-case';
import { GetAllProductsUseCase } from '../../core/use-cases/products/get-all-products.use-case';
import { GetProductByIdUseCase } from '../../core/use-cases/products/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../core/use-cases/products/update-product.use-case';
import { DeleteProductUseCase } from '../../core/use-cases/products/delete-product.use-case';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    ProductRepository,
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [ProductsService, ProductRepository],
})
export class ProductsModule {}
