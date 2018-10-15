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

  @Get('/abstract_factory')
  abstractFactory(@Res() res) {
    res.render('./abstract_factory.html', {
      title: '抽象工厂模式',
      mainMenu: 'abstract_factory'
    });
  }

  @Get('/builder_factory')
  builderFactory(@Res() res) {
    res.render('./builder_factory.html', {
      title: '建造者模式',
      mainMenu: 'builder_factory'
    });
  }
}
