import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity  } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, product => product.client)
  products: ProductEntity[];
}
