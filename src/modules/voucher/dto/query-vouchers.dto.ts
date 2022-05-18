import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class QueryVouchersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voucherName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voucherPrice: string
}
