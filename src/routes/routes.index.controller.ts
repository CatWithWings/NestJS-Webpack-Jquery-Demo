import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller()
export class RoutesIndexController {
  @Get('/')
  defaultRoot(@Res() res) {
    res.redirect('/index');
  }

  @Get('/index')
  index(@Res() res) {
    res.render('./index.html', {
      title: '首页',
      mainMenu: 'home'
    });
  }
}
