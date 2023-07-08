import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ClientEntity, ProductEntity } from '../entities';

@Injectable()
export class Product {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getSoldProducts(): Promise<ProductEntity[]> {
    return await this.entityManager.find(ProductEntity, { where: { sold: true } });
  }

  async getProductsByCustomerId(id: number): Promise<ProductEntity[]> {
    return await this.entityManager.find(ProductEntity, { where: { clientId: id } });
  }

  async getNameProduct(nameProduct: string): Promise<ProductEntity[]> {
    return await this.entityManager.find(ProductEntity, { where: { name: nameProduct } });
  }

  async getDateProduct(date: Date): Promise<ProductEntity[]> {
    return await this.entityManager.find(ProductEntity, { where: { date: date } });
  }

  async getPriceProduct(price: number): Promise<ProductEntity[]> {
    return await this.entityManager.find(ProductEntity, { where: { price: price } });
  }

  async seedData() {
    const client = new ClientEntity();
    client.name = 'John Doe';
    await this.entityManager.save(client);

    const product1 = new ProductEntity();
    product1.name = 'Product 1';
    product1.price = 10;
    product1.sold = true;  
    product1.date = new Date();
    product1.client = client;
    await this.entityManager.save(product1);
    
    const product2 = new ProductEntity();
    product2.name = 'Product 2';
    product2.price = 20;
    product2.sold = true;  
    product2.date = new Date();
    product2.client = client;
    await this.entityManager.save(product2);
  }
}