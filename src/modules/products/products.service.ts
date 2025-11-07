import { Injectable } from '@nestjs/common';
import { CreateProductUseCase } from '../../core/use-cases/products/create-product.use-case';
import { GetAllProductsUseCase } from '../../core/use-cases/products/get-all-products.use-case';
import { GetProductByIdUseCase } from '../../core/use-cases/products/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../core/use-cases/products/update-product.use-case';
import { DeleteProductUseCase } from '../../core/use-cases/products/delete-product.use-case';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../presentation/dtos/product.dto';
import { ProductEntity } from '../../core/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.createProductUseCase.execute(createProductDto);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.getAllProductsUseCase.execute();
  }

  async findOne(id: string): Promise<ProductEntity> {
    return this.getProductByIdUseCase.execute({ id });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.updateProductUseCase.execute({ id, ...updateProductDto });
  }

  async remove(id: string): Promise<void> {
    return this.deleteProductUseCase.execute({ id });
  }
}
