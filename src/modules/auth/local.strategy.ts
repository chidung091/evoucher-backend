import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Users } from '../users/entity/users.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    })
  }
  async validate(email: string, password: string): Promise<Users> {
    return this.authenticationService.login(email, password)
  }
}
