import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { QuestionType } from '../test.enum'

export const TEST_DB = 'test'

@Schema({
  collection: TEST_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Test {
  @Prop({
    required: true,
    unique: true,
  })
  testCode: string

  @Prop({
    required: true,
  })
  numberQuestion: number

  @Prop({
    required: true,
  })
  questionCode: [string]

  @Prop({
    required: true,
  })
  type: QuestionType

  @Prop({
    required: true,
  })
  time: number
}

export const TestSchema = SchemaFactory.createForClass(Test)

export interface TestDocument extends Test, Document {}
