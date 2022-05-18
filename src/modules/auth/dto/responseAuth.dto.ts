import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import Role from '../../users/role.enum'

export class ResponseAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: Role
}
