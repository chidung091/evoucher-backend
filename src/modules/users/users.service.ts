import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersRepository } from './repository/users.repository'
import { Users, UsersDocument } from './entity/users.entity'
import { UsersDto } from './dto/users.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(dto: UsersDto): Promise<UsersDocument> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const users: Users = {
      ...dto,
      balance: 0,
    }
    users.password = hashedPassword
    return this.usersRepository.create(users)
  }

  public async getAll(): Promise<UsersDocument[]> {
    return this.usersRepository.getAll()
  }

  public async getByEmail(email: string) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (user) {
      return user
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    )
  }

  public async checkBalance(email: string) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      )
    }
    return user.balance
  }

  public async topUpBalance(email: string, balance: number) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      )
    }
    const id = user.id
    const oldBalance = user.balance
    return this.usersRepository.updateById({
      id,
      update: {
        balance: oldBalance + balance,
      },
    })
  }
  public async getRole(email: string) {
    const user = await this.usersRepository.getOne({
      conditions: { email: email },
    })
    if (user) {
      return user.role
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    )
  }
}
