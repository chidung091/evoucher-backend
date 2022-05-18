import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class QuestionSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionSearch: string
}
