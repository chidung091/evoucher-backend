import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from '../../../common/repository/base.repository'
import { SetTestDocument, SETTEST_DB } from '../entity/setTest.entity'

@Injectable()
export class SetTestRepository extends BaseRepository<SetTestDocument> {
  constructor(
    @InjectModel(SETTEST_DB)
    private readonly setTestModel: Model<SetTestDocument>,
  ) {
    super(setTestModel)
  }
}
