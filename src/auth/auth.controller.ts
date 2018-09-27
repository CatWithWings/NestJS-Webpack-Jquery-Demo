import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('/token')
  async createToken(): Promise<any> {
    const account = {email: "123@163.com"}
    return await this.authService.createToken(account);
  }
}