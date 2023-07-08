import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductController,
} from './controllers';
import { ProductEntity, ClientEntity } from './core/entities';
import { ProductService } from './use-cases/product';
import { Product } from './core/repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ClientEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [
    ProductController,
  ],
  providers: [
    ProductService, 
    Product,
  ],
})
export class AppModule {}
