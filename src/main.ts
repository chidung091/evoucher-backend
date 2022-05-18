import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api/')

  setUpSwagger(app)
  app.enableCors()
  await app.listen(3002)
}
function setUpSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('eVoucher API')
    .setDescription(
      `API specification for eVoucher.\n
    Terms:\n
    - Internal: only available for other services in eVoucher system.`,
    )
    .setVersion('3.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
    customSiteTitle: 'eVoucher APi',
  })
}
bootstrap()
