import { Injectable } from '@nestjs/common'
import { CreateVouchersDto } from './dto/create-vouchers.dto'
import { VouchersDocument } from './entity/voucher.entity'
import { VouchersRepository } from './repository/voucher.repository'

@Injectable()
export class VoucherService {
  constructor(private readonly vouchersRepository: VouchersRepository) {}

  async createVoucher(dto: CreateVouchersDto): Promise<VouchersDocument> {
    return this.vouchersRepository.create({
      ...dto,
      status: false,
    })
  }

  public async getAll(): Promise<VouchersDocument[]> {
    return this.vouchersRepository.getAll()
  }
  public async getVoucherByOwner(email: string) {
    return this.vouchersRepository.getMany({
      conditions: { ownerEmail: email },
    })
  }
}
