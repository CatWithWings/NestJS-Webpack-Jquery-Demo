import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/arithmetic')
export class RoutesArithmeticController {
  @Get('/array')
  simpleFactory(@Res() res) {
    res.render('./arithmetic/array.html', {
      title: '数组',
      mainMenu: 'array',
      toggleMenu: 'arithmetic'
    });
  }
}
