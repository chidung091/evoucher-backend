import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'src/decorators/validators'
import { BaseDto } from '../../../common/dto'

export class VouchersResponse extends BaseDto {
  @ApiProperty()
  @IsString()
  voucherName: string

  @ApiProperty()
  @IsString()
  voucherId: string

  @ApiProperty()
  @IsString()
  voucherPrice: string

  @ApiProperty()
  @IsString()
  ownerEmail: string
}
