import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UsersDto } from '../users/dto/users.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { LocalAuthenticationGuard } from './localAuthentication.guard'
import RequestWithUser from './dto/requestWithUser.dto'
import { ResponseAuthDto } from './dto/responseAuth.dto'
import { CreateUsersDto } from '../users/dto/create-users.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create new users' })
  @ApiResponse({ status: 201, description: 'Success', type: UsersDto })
  async registerUser(@Body() usersDTO: CreateUsersDto) {
    return this.authService.register(usersDTO)
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthDto })
  async logIn(@Req() req: RequestWithUser) {
    const user: ResponseAuthDto = {
      email: req.user.email,
      token: this.authService.getJWTToken(req.user.email, req.user.role),
      role: req.user.role,
    }
    return user
  }
  @Get('/check-role')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check role' })
  @ApiResponse({ type: ResponseAuthDto })
  async checkRole(@Req() req) {
    return this.authService.checkRole(req.user.email)
  }
}
