import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from '../../../common/repository/base.repository'
import { UsersDocument, USERS_DB } from '../entity/users.entity'

@Injectable()
export class UsersRepository extends BaseRepository<UsersDocument> {
  constructor(
    @InjectModel(USERS_DB)
    private readonly usersModel: Model<UsersDocument>,
  ) {
    super(usersModel)
  }
}
