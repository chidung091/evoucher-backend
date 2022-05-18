import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from '../../../common/repository/base.repository'
import { VouchersDocument, VOUCHERS_DB } from '../entity/voucher.entity'

@Injectable()
export class VouchersRepository extends BaseRepository<VouchersDocument> {
  constructor(
    @InjectModel(VOUCHERS_DB)
    private readonly vouchersModel: Model<VouchersDocument>,
  ) {
    super(vouchersModel)
  }
}
