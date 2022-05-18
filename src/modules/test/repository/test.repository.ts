import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from '../../../common/repository/base.repository'
import { TestDocument, TEST_DB } from '../entity/test.entity'

@Injectable()
export class TestRepository extends BaseRepository<TestDocument> {
  constructor(
    @InjectModel(TEST_DB)
    private readonly testModel: Model<TestDocument>,
  ) {
    super(testModel)
  }
}
