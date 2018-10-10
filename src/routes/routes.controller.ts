import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller()
export class RoutesController {
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

  @Get('/simple_factory')
  simpleFactory(@Res() res) {
    res.render('./simple_factory.html', {
      title: '简单工厂模式',
      mainMenu: 'simple_factory'
    });
  }
}
