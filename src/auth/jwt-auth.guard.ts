import {
  ExecutionContext,
  Injectable,
  UseFilters
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HttpExceptionFilter } from '../share/errorExceotion/HttpExceptionFilter';
import { UnauthorizedException } from '../share/errorExceotion/UnauthorizedException';

// 修改了原生的AuthGuard守卫器
@Injectable()
@UseFilters(new HttpExceptionFilter())
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized Request');
    }
    return user;
  }
}