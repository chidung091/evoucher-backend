import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVouchersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voucherName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voucherId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voucherPrice: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerEmail: string
}
