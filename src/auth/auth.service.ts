import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async createToken(user: JwtPayload ) {
    return jwt.sign(user, 'secretKey');
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return {};
  }
}