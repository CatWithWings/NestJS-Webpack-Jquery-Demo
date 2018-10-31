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

  @Get('/adapter_factory')
  adapterFactory(@Res() res) {
    res.render('./adapter_factory.html', {
      title: '适配器模式',
      mainMenu: 'adapter_factory'
    });
  }

  @Get('/decorator_factory')
  decoratorFactory(@Res() res) {
    res.render('./decorator_factory.html', {
      title: '装饰者模式',
      mainMenu: 'decorator_factory'
    });
  }

  @Get('/bridge_factory')
  bridgeFactory(@Res() res) {
    res.render('./bridge_factory.html', {
      title: '桥接模式',
      mainMenu: 'bridge_factory'
    });
  }

  @Get('/group_factory')
  groupFactory(@Res() res) {
    res.render('./group_factory.html', {
      title: '组合模式',
      mainMenu: 'group_factory'
    });
  }

  @Get('/share_factory')
  shareFactory(@Res() res) {
    res.render('./share_factory.html', {
      title: '享元模式',
      mainMenu: 'share_factory'
    });
  }

  @Get('/template_factory')
  templateFactory(@Res() res) {
    res.render('./template_factory.html', {
      title: '模板方法模式',
      mainMenu: 'template_factory'
    });
  }

  @Get('/observers_factory')
  observersFactory(@Res() res) {
    res.render('./observers_factory.html', {
      title: '观察者模式',
      mainMenu: 'observers_factory'
    });
  }
}
