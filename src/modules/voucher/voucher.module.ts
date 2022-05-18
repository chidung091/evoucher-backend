import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VouchersSchema, VOUCHERS_DB } from './entity/voucher.entity'
import { VouchersRepository } from './repository/voucher.repository'
import { VoucherController } from './voucher.controller'
import { VoucherService } from './voucher.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VOUCHERS_DB, schema: VouchersSchema }]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService, VouchersRepository],
})
export class VoucherModule {}
