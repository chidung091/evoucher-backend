import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class BalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  balance: number
}
