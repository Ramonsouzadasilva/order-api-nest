export class ProductEntity {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }

  isInStock(): boolean {
    return this.stock > 0;
  }

  canFulfillQuantity(quantity: number): boolean {
    return this.stock >= quantity;
  }
}
