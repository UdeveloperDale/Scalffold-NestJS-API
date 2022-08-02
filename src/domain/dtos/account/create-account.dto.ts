import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';


export class CreateAccountDto {

  @ApiProperty({ example: '00000000', description: 'Account Number' })
  @IsString()
  @Length(8, 8, { message: 'Debe asignar un valor de 8 digitos' })
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: 'Saving Account', description: 'Account Name' })
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @ApiProperty({ example: 1000, description: 'Account Amount Initial' })
  @IsNumber()
  @Min(1000)
  @Max(100000)
  amount: number;
}