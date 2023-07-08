import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Product } from './core/respositories/product.respository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const product = app.get(Product);
  //await product.seedData();
  await app.listen(3000);
}
bootstrap();
