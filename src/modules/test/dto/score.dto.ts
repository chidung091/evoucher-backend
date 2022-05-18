import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ScoreDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number
}
