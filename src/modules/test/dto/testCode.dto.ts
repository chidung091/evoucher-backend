import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TestCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testCode: string
}
