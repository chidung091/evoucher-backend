import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export const VOUCHERS_DB = 'vouchers'

@Schema({
  collection: VOUCHERS_DB,
  timestamps: true,
  toJSON: { virtuals: true },
  collation: { locale: 'vi' },
  validateBeforeSave: true,
})
export class Vouchers {
  @Prop({
    required: true,
    unique: true,
  })
  voucherId: string

  @Prop({
    required: true,
  })
  voucherName: string

  @Prop({
    required: true,
  })
  voucherPrice: string

  @Prop({
    required: true,
  })
  ownerEmail: string

  @Prop({
    required: true,
  })
  status: boolean
}
export const VouchersSchema = SchemaFactory.createForClass(Vouchers)

export interface VouchersDocument extends Vouchers, Document {}
