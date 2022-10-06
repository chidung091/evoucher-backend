import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVouchersDto } from './dto/create-vouchers.dto'
import { VouchersDocument, VOUCHERS_DB } from './entity/voucher.entity'
import { VouchersRepository } from './repository/voucher.repository'

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(VOUCHERS_DB) private vouchersModel: Model<VouchersDocument>,
    private readonly vouchersRepository: VouchersRepository,
  ) {}

  async createVoucher(
    email: string,
    dto: CreateVouchersDto,
  ): Promise<VouchersDocument> {
    const date = this.addMonths(3)
    const outputDate = this.removeMonths(3)
    return this.vouchersRepository.create({
      ...dto,
      ownerEmail: email,
      voucherExpiryDate: date,
      voucherOutputDate: outputDate,
      hotline: '1900 299 232',
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
    const data = await this.vouchersModel.aggregate([
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
    const dataRes = []
    await Promise.all(
      data.map((single) => {
        const dataResponse = {
          name: single._id.name,
          price: single._id.price,
          count: single.count,
        }
        dataRes.push(dataResponse)
      }),
    )
    return dataRes
  }

  public async markUsed(id: string) {
    const findId = await this.vouchersRepository.getOne({
      conditions: { voucherId: id },
    })
    if (!findId) {
      throw new BadRequestException('ID not found')
    }
    return this.vouchersRepository.deleteById(findId.id)
  }

  public addMonths(numOfMonths: number) {
    const date = new Date()
    date.setMonth(date.getMonth() + numOfMonths)
    return date
  }

  public removeMonths(numOfMonths: number) {
    const date = new Date()
    date.setMonth(date.getMonth() - numOfMonths)
    return date
  }
}
