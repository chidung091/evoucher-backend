import { ApiProperty } from '@nestjs/swagger'

export class AnswerTestUserDto {
  @ApiProperty()
  score: number

  @ApiProperty()
  idUser: string
}
