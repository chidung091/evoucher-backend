import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DATABASE_URI, ENV } from './config/secrets'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { VoucherModule } from './modules/voucher/voucher.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(DATABASE_URI),
    AuthModule,
    UsersModule,
    VoucherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
