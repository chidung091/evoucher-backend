import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator'
import { DifficultyType, QuestionType } from '../question.enum'
import { Answer } from '../entity/question.entity'

export class GetQuestionResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string

  @ApiProperty({
    type: 'enum',
    enum: QuestionType,
    description: 'Select what type of Model: Prepaid/Postpaid',
  })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: QuestionType

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  answer: Answer

  @ApiProperty({
    type: 'enum',
    enum: DifficultyType,
    description: 'Select what type of Model: Prepaid/Postpaid',
  })
  @IsEnum(DifficultyType)
  @IsNotEmpty()
  difficulty: DifficultyType
}
