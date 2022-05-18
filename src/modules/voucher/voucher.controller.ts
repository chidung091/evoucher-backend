import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { Roles } from 'src/decorators'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RoleGuard } from '../auth/role.guard'
import Role from '../users/role.enum'
import { CreateVouchersDto } from './dto/create-vouchers.dto'
import { VouchersResponse } from './dto/vouchers-response.dto'
import { VoucherService } from './voucher.service'

@ApiBearerAuth()
@ApiTags('vouchers')
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly vouchersService: VoucherService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create new vouchers' })
  @ApiResponse({ status: 201, description: 'Success', type: VouchersResponse })
  async createOrder(@Body() vouchersDto: CreateVouchersDto) {
    return await this.vouchersService.createVoucher(vouchersDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all vouchers' })
  async getVoucherByUser(@Req() req) {
    return this.vouchersService.getVoucherByOwner(req.user.email)
  }
}
