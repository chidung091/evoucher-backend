import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { GuestType, QuestionType } from '../test.enum'

export const SETTEST_DB = 'settest'

@Schema({
  collection: SETTEST_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class SetTest {
  @Prop({
    required: true,
  })
  idUser: string

  @Prop({
    required: true,
  })
  score: number
}

export const SetTestSchema = SchemaFactory.createForClass(SetTest)

export interface SetTestDocument extends SetTest, Document {}
