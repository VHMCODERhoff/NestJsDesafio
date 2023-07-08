import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ProductService } from '../use-cases/product';

@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('sold')
  async getSoldProducts() {
    return this.productService.getSoldProducts();
  }

  @Get('customer/:customerId')
  async getProductsByCustomerId(@Param('customerId') customerId: number) {
    return this.productService.getProductsByCustomerId(customerId);
  }

  @Get('customer/:customerId/number')
  async getNumberOfProductsPurchased(
    @Param('customerId') customerId: number,
    @Body('date') dateProduct: Date,
    @Body('name') nameProduct: string,
    @Body('price') priceProduct: number,
  ) {
    return this.productService.getNumberOfProductsPurchased(
      customerId,
      dateProduct,
      nameProduct,
      priceProduct,
    );
  }
  

}
