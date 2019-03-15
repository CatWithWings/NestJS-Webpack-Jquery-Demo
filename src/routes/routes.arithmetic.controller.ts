import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/arithmetic')
export class RoutesArithmeticController {
  @Get('/array')
  array(@Res() res) {
    res.render('./arithmetic/array.html', {
      title: '数组/栈',
      mainMenu: 'array',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/queue')
  queue(@Res() res) {
    res.render('./arithmetic/queue.html', {
      title: '队列',
      mainMenu: 'queue',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/linkList')
  linkList(@Res() res) {
    res.render('./arithmetic/linkList.html', {
      title: '链表',
      mainMenu: 'linkList',
      toggleMenu: 'arithmetic'
    });
  }
}
