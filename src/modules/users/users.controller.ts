import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersDto } from './dto/users.dto'
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import RoleGuard from '../auth/role.guard'
import Role from './role.enum'
import { BalanceDto } from './dto/balance.dto'

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create new users' })
  @ApiResponse({ status: 201, description: 'Success', type: UsersDto })
  async createOrder(@Body() usersDTO: UsersDto) {
    return await this.usersService.create(usersDTO)
  }

  @Get('/balance')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get users balance' })
  @ApiResponse({ status: 200, description: 'Success', type: BalanceDto })
  async getBalance(@Req() req) {
    return await this.usersService.checkBalance(req.user.email)
  }

  @Post('/balance')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'top up users balance' })
  @ApiResponse({ status: 200, description: 'Success', type: BalanceDto })
  async topUpBalance(@Req() req, @Body() balance: BalanceDto) {
    return await this.usersService.topUpBalance(req.user.email, balance.balance)
  }

  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAll()
  }
}
