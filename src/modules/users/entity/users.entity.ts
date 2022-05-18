import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import Role from '../role.enum'

export const USERS_DB = 'users'

@Schema({
  collection: USERS_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Users {
  @Prop({
    type: mongoose.Schema.Types.String,
    enum: Object.values(Role),
    default: Role.User,
  })
  role: Role

  @Prop({
    required: true,
  })
  name: string

  @Prop({
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({
    default: 0,
  })
  balance: number
}

export const UsersSchema = SchemaFactory.createForClass(Users)

export interface UsersDocument extends Users, Document {}
