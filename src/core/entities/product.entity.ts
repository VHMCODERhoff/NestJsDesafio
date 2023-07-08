import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity  } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  sold: boolean;

  @Column()
  clientId: number;

  @ManyToOne(() => ClientEntity, client => client.products)
  client: ClientEntity;
  
  @Column()
  date: Date;
}