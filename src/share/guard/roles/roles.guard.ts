import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseFilters,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { HttpExceptionFilter } from '../../errorExceotion/HttpExceptionFilter';
import { ForbiddenException } from '../../errorExceotion/ForbiddenException';

// 看守器会在中间件之后pipe之前调用
@Injectable()
@UseFilters(new HttpExceptionFilter())
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // this.reflector.get<string[]>的第一个参数对应了ReflectMetadata的第一个参数
    // 所以才能找到元数据应该传递给哪个看守器
    const roles: any = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some(role => roles.includes(role));
    const result = user && user.roles && hasRole();

    console.log(`all user roles are ${user.roles.join(', ')}`);
    console.log(`I\'m a guard, roles are ${roles.join(', ')}`);

    if (result) {
      return true;
    } else {
      throw new ForbiddenException('Auccess is denied');
    }
  }
}
