import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";

export class UpdateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Saving Account', description: 'Account Name' })
  accountName: string;

  @ApiProperty({ example: 1000, description: 'Account Amount Initial' })
  @IsNumber()
  @Min(1000)
  @Max(100000)
  amount: number;
}