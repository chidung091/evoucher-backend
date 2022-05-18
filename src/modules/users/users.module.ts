import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { USERS_DB, UsersSchema } from './entity/users.entity'
import { UsersRepository } from './repository/users.repository'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: USERS_DB, schema: UsersSchema }]),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
