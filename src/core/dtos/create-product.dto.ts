import { IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  sold: boolean;

  @IsDate()
  date: Date;
}

