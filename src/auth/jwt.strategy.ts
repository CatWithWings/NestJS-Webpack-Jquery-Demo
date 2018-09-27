import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UseFilters } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { secretKey } from '../auth.config';
import { UnauthorizedException } from '../share/errorExceotion/UnauthorizedException';
import { HttpExceptionFilter } from '../share/errorExceotion/HttpExceptionFilter';

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    console.log('cc')
    if (!user) {
      throw new UnauthorizedException('Unauthorized Request')
    }
    return user;
  }
}