import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'
import { AnswerType } from '../../question/question.enum'
export class AnswerRequest {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  answer: AnswerType
}

export class AnswerTestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testCode: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numberQuestion: number

  @ApiProperty({ type: [AnswerRequest] })
  @IsArray()
  @IsNotEmpty()
  answer: AnswerRequest[]
}
