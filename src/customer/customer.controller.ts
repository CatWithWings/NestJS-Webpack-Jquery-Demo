import {
  Get,
  Post,
  Options,
  Head,
  Body,
  Controller,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
  UseGuards,
  HttpCode,
  Header,
  HttpStatus,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Customer } from './customer.dto';

import { ValidationPipe } from '../share/pipes/validation.pipe';
import { ResponseInterceptor } from '../share/interceptor/response.interceptor';
import { HttpExceptionFilter } from '../share/errorExceotion/HttpExceptionFilter';
import { CustomerService } from './customer.server';

@Controller('/customer')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new ResponseInterceptor())
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtStrategy: JwtStrategy
  ) {}

  @HttpCode(200)
  @Get('/all')
  async findAll() {
    const result = await this.customerService.findAll();

    return {
      data: result,
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(200)
  @Post('/create')
  // 身份验证
  // @UseGuards(AuthGuard())
  @UseGuards(JwtAuthGuard)
  async createCustomer(@Req() request, @Body(new ValidationPipe()) createCustomer: Customer) {
    console.log('cc1', this.jwtStrategy.validate({email: "123@163.com"}))
    return {
      data: [],
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(200)
  @Get('/foods')
  async findAllFoods() {
    const result = await this.customerService.findAllFoods();

    return {
      data: result,
      statusCode: HttpStatus.OK
    }
  }

  // 测试option请求
  @HttpCode(200)
  @Options('/options')
  @UseGuards(JwtAuthGuard)
  async optionCustomer(@Req() request) {
    return {};
  }

  // 测试head请求
  @HttpCode(200)
  @Head('/head')
  @UseGuards(JwtAuthGuard)
  async headCustomer(@Req() request) {
    return {};
  }

  /**
   * HTTP原生质询/响应框架测试
   * 由于使用了@Res，所以标准模式不能够使用
   * 比如添加return 否则会因为服务器2次及以上响应
   * 报can't set headers after sent
   * 质询看HTTP权威指南第12章
   */
  @Get('/www_authorization')
  async wwwAuthorizationCustomer(@Req() request, @Res() res) {
    res.set('WWW-Authenticate', 'Basic realm="Family"')
    const  authorization = request.headers.authorization;

    if (authorization) {
      return res.status(200).send({
        data: [],
        statusCode: HttpStatus.OK
      });
    }else {
      return res.status(401).send();
    }
  }
}
