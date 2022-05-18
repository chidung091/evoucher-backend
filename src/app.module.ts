import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DATABASE_URI, ENV } from './config/secrets'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { QuestionModule } from './modules/question/question.module'
import { TestModule } from './modules/test/test.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(DATABASE_URI),
    AuthModule,
    UsersModule,
    QuestionModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
