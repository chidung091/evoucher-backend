import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { TestService } from './test.service'
import { CreateTestDto } from './dto/create-test.dto'
import { AnswerTestDto } from './dto/answer-test.dto'
import { ScoreDto } from './dto/score.dto'
import { TestCodeDto } from './dto/testCode.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import RoleGuard from '../auth/role.guard'
import Role from '../users/role.enum'
import { AnswerTestUserDto } from './dto/answer-user.dto'

@ApiTags('test')
@ApiBearerAuth()
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async createOrder(@Body() dto: CreateTestDto) {
    return await this.testService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'get All test' })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateTestDto] })
  async getAllTest() {
    return await this.testService.getAll()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get test by id' })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateTestDto] })
  async getTestById(@Param('id') id: string) {
    return await this.testService.getTestID(id)
  }

  @Put('/:id/update')
  @ApiOperation({ summary: 'update new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async updateTest(@Param('id') id: string, @Body() dto: CreateTestDto) {
    return await this.testService.updateTest(id, dto)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'delete a test' })
  @ApiResponse({ status: 201, description: 'Success', type: [CreateTestDto] })
  async deleteTest(@Param('id') id: string) {
    return await this.testService.deleteTest(id)
  }

  @Post('/test/guest')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async getTest(@Body() dto: TestCodeDto) {
    return await this.testService.getTest(dto.testCode)
  }

  @Get('/test/user')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get random test' })
  @ApiResponse({ status: 201, description: 'Success', type: CreateTestDto })
  async getUserTest() {
    return await this.testService.getTestRandom()
  }

  @Post('/answer/guest')
  @ApiOperation({ summary: 'Create new test' })
  @ApiResponse({ status: 201, description: 'Success', type: ScoreDto })
  async calculationAnswer(@Body() dto: AnswerTestDto) {
    return await this.testService.calculationAnswer(dto)
  }

  @Post('/answer/user')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Canculation test' })
  @ApiResponse({ status: 201, description: 'Success', type: AnswerTestUserDto })
  async calculationAnswerUser(@Req() req, @Body() dto: AnswerTestDto) {
    return await this.testService.calculationAnswerUser(req.user.email, dto)
  }
  @Get('/answer/user')
  @UseGuards(RoleGuard(Role.User))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get all test' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [AnswerTestUserDto],
  })
  async getALlTestResult(@Req() req) {
    return await this.testService.getTestByID(req.user.email)
  }
}
