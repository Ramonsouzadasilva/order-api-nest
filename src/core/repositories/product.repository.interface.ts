import type { ProductEntity } from '../entities/product.entity';

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface IProductRepository {
  create(data: CreateProductData): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  update(id: string, data: UpdateProductData): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<ProductEntity>;
}
