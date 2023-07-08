import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../core/entities';
import { Product } from '../../core/repositories/product.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: Product) {}
 

  async getSoldProducts(): Promise<ProductEntity[]> {
    return this.productRepository.getSoldProducts();
  }
 
  async getProductsByCustomerId(id: number): Promise<ProductEntity[]> {
    return this.productRepository.getProductsByCustomerId(id);
  }

  async getNumberOfProductsPurchased(id: number, dateProduct: Date, nameProduct: string, priceProduct: number): Promise<number> {
    const filters: { date?: Date, name?: string, price?: number } = {};
    let customerProducts = await this.productRepository.getProductsByCustomerId(id);
  
    if (dateProduct) {
      filters.date = dateProduct;
      customerProducts = await this.productRepository.getDateProduct(dateProduct);
    }
    if (nameProduct) {
      filters.name = nameProduct;
      customerProducts = await this.productRepository.getNameProduct(nameProduct);
    }
    if (priceProduct) {
      filters.price = priceProduct;
      customerProducts = await this.productRepository.getPriceProduct(priceProduct);
    }
  
    const numberOfProducts = customerProducts.length;
    return numberOfProducts;
  }
}
