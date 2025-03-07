import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsInt()
  @IsNotEmpty()
  value: number;
}
