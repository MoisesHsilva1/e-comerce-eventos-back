import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;
}
