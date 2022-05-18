import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsString } from 'class-validator'
import { Document } from 'mongoose'
import { AnswerType, DifficultyType, QuestionType } from '../question.enum'
import { ApiProperty } from '@nestjs/swagger'

export const QUESTION_DB = 'question'

export class Answer {
  @Prop({
    required: true,
  })
  @ApiProperty()
  @IsString()
  answerA: string

  @Prop({
    required: true,
  })
  @ApiProperty()
  @IsString()
  answerB: string

  @Prop({
    required: true,
  })
  @ApiProperty()
  @IsString()
  answerC: string

  @Prop({
    required: true,
  })
  @ApiProperty()
  @IsString()
  answerD: string
}

@Schema({
  collection: QUESTION_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Question {
  @Prop({
    required: true,
  })
  question: string

  @Prop({
    required: true,
  })
  questionType: QuestionType

  @Prop({
    required: true,
  })
  answer: Answer

  @Prop({
    required: true,
  })
  correctAnswer: AnswerType

  @Prop({
    required: true,
  })
  difficulty: DifficultyType
}

export const QuestionSchema = SchemaFactory.createForClass(Question)

export interface QuestionDocument extends Question, Document {}
