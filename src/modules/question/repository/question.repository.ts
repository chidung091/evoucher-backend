import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from '../../../common/repository/base.repository'
import { QuestionDocument, QUESTION_DB } from '../entity/question.entity'

@Injectable()
export class QuestionRepository extends BaseRepository<QuestionDocument> {
  constructor(
    @InjectModel(QUESTION_DB)
    private readonly questionModel: Model<QuestionDocument>,
  ) {
    super(questionModel)
  }
}
