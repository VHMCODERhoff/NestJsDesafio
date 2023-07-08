import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../src/controllers/product.controller';
import { ProductService } from '../src/use-cases/product/product.use-case';
import { ProductEntity } from '../src/core/entities/product.entity';
import { Product } from '../src/core/repositories/product.repository';
import { EntityManager } from 'typeorm';

class ProductRepositoryMock {
  constructor(private readonly entityManager: EntityManager) {}
  async getSoldProducts(): Promise<ProductEntity[]> {return []; }
}

class EntityManagerMock {}



describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: Product,
          useClass: ProductRepositoryMock,
          inject: [EntityManager],
        },
        {
          provide: EntityManager,
          useClass: EntityManagerMock,
        },
      ],
    }).compile();
    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('getSoldProducts', () => {
    it('should return an array of the products solds', async () => {
      const products: ProductEntity[] = [];
      jest.spyOn(service, 'getSoldProducts').mockResolvedValue(products);
      const result = await controller.getSoldProducts();
      expect(result).toEqual(products);
    });
  });

  describe('getProductsByCustomerId', () => {
    it('should return an array of the products solds', async () => {
      const products: ProductEntity[] = [];
      jest.spyOn(service, 'getProductsByCustomerId').mockResolvedValue(products);
      const result = await controller.getProductsByCustomerId(1);
      expect(result).toEqual(products);
    });
  });

  describe('getNumberOfProductsPurchased', () => {
    it('should return the number of products purchased by a customer', async () => {
      const numberOfProducts = 1;
      jest.spyOn(service, 'getNumberOfProductsPurchased').mockResolvedValue(numberOfProducts);
      const result = await controller.getNumberOfProductsPurchased(1, new Date(), 'Product', 1);
      expect(result).toEqual(numberOfProducts);
    }); 
  });

});
