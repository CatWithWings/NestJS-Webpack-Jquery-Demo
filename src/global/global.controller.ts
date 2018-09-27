import {
  Get,
  Controller,
  Req,
  Res,
  Next,
  UseFilters,
  UseGuards,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { RolesGuard } from '../share/guard/roles/roles.guard';
import { Roles } from '../share/guard/roles/roles.decorator';
import { ResponseInterceptor } from '../share/interceptor/response.interceptor';
import { ForbiddenException } from '../share/errorExceotion/ForbiddenException';
import { HttpExceptionFilter } from '../share/errorExceotion/HttpExceptionFilter';
import { GlobalService } from './global.service';

@Controller('/global')
@UseGuards(RolesGuard)
@UseInterceptors(new ResponseInterceptor())
@UseFilters(new HttpExceptionFilter())
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('/error_role')
  @Roles('x') // 传递角色给看守器
  testErrorRoles(): any {
    return {
      data: true,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/error_test')
  @Roles('admin') // 传递角色给看守器
  testError(): any {
    const result = this.globalService.test();

    throw new ForbiddenException('Your is been denied');

    return {
      data: result,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/success_test')
  @Roles('admin', 'manager') // 传递角色给看守器
  testSuccess(): any {
    const result = this.globalService.test();

    return {
      data: result,
      statusCode: HttpStatus.OK,
    };
  }
}
