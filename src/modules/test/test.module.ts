import { Module } from '@nestjs/common'
import { TestService } from './test.service'
import { TestController } from './test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TEST_DB, TestSchema } from './entity/test.entity'
import { TestRepository } from './repository/test.repository'
import { QuestionModule } from '../question/question.module'
import { SetTestSchema, SETTEST_DB } from './entity/setTest.entity'
import { UsersModule } from '../users/users.module'
import { SetTestRepository } from './repository/setTest.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TEST_DB, schema: TestSchema }]),
    MongooseModule.forFeature([{ name: SETTEST_DB, schema: SetTestSchema }]),
    QuestionModule,
    UsersModule,
  ],
  providers: [TestService, TestRepository, SetTestRepository],
  controllers: [TestController],
})
export class TestModule {}
