import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVouchersDto } from './dto/create-vouchers.dto'
import {
  Vouchers,
  VouchersDocument,
  VOUCHERS_DB,
} from './entity/voucher.entity'
import { VouchersRepository } from './repository/voucher.repository'

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(VOUCHERS_DB) private vouchersModel: Model<VouchersDocument>,
    private readonly vouchersRepository: VouchersRepository,
  ) {}

  async createVoucher(dto: CreateVouchersDto): Promise<VouchersDocument> {
    return this.vouchersRepository.create({
      ...dto,
      status: false,
    })
  }

  public async getAll(): Promise<VouchersDocument[]> {
    return this.vouchersRepository.getAll()
  }
  public async getVoucherByOwnerAndType(
    email: string,
    name: string,
    price: string,
  ) {
    return this.vouchersRepository.getMany({
      conditions: { ownerEmail: email, voucherName: name, voucherPrice: price },
    })
  }
  public async getVoucherCount(email: string) {
    return this.vouchersModel.aggregate([
      { $match: { ownerEmail: email } },
      {
        $group: {
          _id: {
            name: '$voucherName',
            price: '$voucherPrice',
          },
          count: { $sum: 1 },
        },
      },
    ])
  }
}
