import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { QuestionRepository } from './repository/question.repository'
import { Question, QuestionDocument } from './entity/question.entity'
import { CreateQuestion } from './dto/create-question.dto'
import { AnswerType, QuestionType } from './question.enum'

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public async create(dto: CreateQuestion) {
    const data: Question = {
      ...dto,
    }
    return this.questionRepository.create(data)
  }
  public async createMany(dto: CreateQuestion[]): Promise<QuestionDocument[]> {
    return this.questionRepository.createMany(dto)
  }
  public async getAll(): Promise<QuestionDocument[]> {
    return this.questionRepository.getAll()
  }

  public async getById(id: string): Promise<QuestionDocument> {
    return this.questionRepository.getById({ id })
  }

  public async searchByName(
    questionSearch: string,
  ): Promise<QuestionDocument[]> {
    const data = await this.questionRepository.getMany({
      conditions: { question: { $regex: '.*' + questionSearch + '.*' } },
    })
    if (!data) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Can't find Question`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    return data
  }

  public async getByType(type: QuestionType): Promise<QuestionDocument[]> {
    return this.questionRepository.getMany({
      conditions: { questionType: type },
    })
  }

  public async getByIdForTest(id: string): Promise<QuestionDocument> {
    const result = await this.questionRepository.getById({ id })
    result.correctAnswer = undefined
    return result
  }
  public async updateQuestion(
    id: string,
    dto: CreateQuestion,
  ): Promise<QuestionDocument> {
    const question = await this.questionRepository.getById({ id })
    if (!question) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Can't find Question`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.questionRepository.updateById({ id, update: dto })
  }

  public async deleteQuestion(id: string): Promise<QuestionDocument> {
    const question = await this.questionRepository.getById({ id })
    if (!question) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Can't find Question`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.questionRepository.deleteById(id)
  }

  public async checkQuestion(ids: [string]) {
    return await this.questionRepository.count({
      conditions: {
        _id: { $in: ids },
      },
    })
  }

  public async checkAnswer(id: string, answer: AnswerType) {
    const question = await this.questionRepository.getById({ id })
    if (question.correctAnswer === answer) {
      return 1
    }
    return 0
  }
}
