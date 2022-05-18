import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { QuestionType } from '../question.enum'

export class QuestionTypeDto {
  @ApiProperty({
    type: 'enum',
    enum: QuestionType,
    description: 'Select what type of Model: Prepaid/Postpaid',
  })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: QuestionType
}
