import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { QUESTION_DB, QuestionSchema } from './entity/question.entity'
import { QuestionRepository } from './repository/question.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QUESTION_DB, schema: QuestionSchema }]),
  ],
  providers: [QuestionService, QuestionRepository],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
