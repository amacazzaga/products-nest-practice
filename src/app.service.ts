import { Injectable } from "@nestjs/common";

export interface Product {
  name: string;
  price: number;
  description: string;
}

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
  }

  findAll(): Product[] {
    return this.products;
  }
}