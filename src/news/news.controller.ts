import {
  Get,
  Controller,
  UseFilters,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ResponseInterceptor } from '../share/interceptor/response.interceptor';
import { HttpExceptionFilter } from '../share/errorExceotion/HttpExceptionFilter';
import { NewsService } from './news.service';

@Controller('/news')
@UseInterceptors(new ResponseInterceptor())
@UseFilters(new HttpExceptionFilter())
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @HttpCode(200)
  @Get('/list')
  @UseGuards(JwtAuthGuard)
  getList(@Query() query): any {
    return {
      data: [
        {
          item: 'icon',
          type: 'video',
          href: '#',
          text: '我是视频新闻1'
        },
        {
          item: 'icon',
          type: 'headset',
          href: '#',
          text: '我是直播新闻1'
        },
        {
          item: 'icon',
          type: 'video',
          href: '#',
          text: '我是视频新闻2'
        },
        {
          item: 'icon',
          type: 'headset',
          href: '#',
          text: '我是直播新闻2'
        },
        {
          item: 'icon',
          type: 'video',
          href: '#',
          text: '我是视频新闻3'
        },
        {
          item: 'icon',
          type: 'headset',
          href: '#',
          text: '我是直播新闻3'
        }
      ],
      statusCode: HttpStatus.OK,
    };
  }
}
