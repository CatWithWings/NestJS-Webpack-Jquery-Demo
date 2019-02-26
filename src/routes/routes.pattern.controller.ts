import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/pattern')
export class RoutesPatternController {
  @Get('/simple_factory')
  simpleFactory(@Res() res) {
    res.render('./pattern/simple_factory.html', {
      title: '简单工厂模式',
      mainMenu: 'simple_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/abstract_factory')
  abstractFactory(@Res() res) {
    res.render('./pattern/abstract_factory.html', {
      title: '抽象工厂模式',
      mainMenu: 'abstract_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/builder_factory')
  builderFactory(@Res() res) {
    res.render('./pattern/builder_factory.html', {
      title: '建造者模式',
      mainMenu: 'builder_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/adapter_factory')
  adapterFactory(@Res() res) {
    res.render('./pattern/adapter_factory.html', {
      title: '适配器模式',
      mainMenu: 'adapter_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/decorator_factory')
  decoratorFactory(@Res() res) {
    res.render('./pattern/decorator_factory.html', {
      title: '装饰者模式',
      mainMenu: 'decorator_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/bridge_factory')
  bridgeFactory(@Res() res) {
    res.render('./pattern/bridge_factory.html', {
      title: '桥接模式',
      mainMenu: 'bridge_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/group_factory')
  groupFactory(@Res() res) {
    res.render('./pattern/group_factory.html', {
      title: '组合模式',
      mainMenu: 'group_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/share_factory')
  shareFactory(@Res() res) {
    res.render('./pattern/share_factory.html', {
      title: '享元模式',
      mainMenu: 'share_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/template_factory')
  templateFactory(@Res() res) {
    res.render('./pattern/template_factory.html', {
      title: '模板方法模式',
      mainMenu: 'template_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/observers_factory')
  observersFactory(@Res() res) {
    res.render('./pattern/observers_factory.html', {
      title: '观察者模式',
      mainMenu: 'observers_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/state_factory')
  stateFactory(@Res() res) {
    res.render('./pattern/state_factory.html', {
      title: '状态模式',
      mainMenu: 'state_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/strategy_factory')
  strategyFactory(@Res() res) {
    res.render('./pattern/strategy_factory.html', {
      title: '策略模式',
      mainMenu: 'strategy_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/response_chain_factory')
  responseChainFactory(@Res() res) {
    res.render('./pattern/response_chain_factory.html', {
      title: '责任链模式',
      mainMenu: 'response_chain_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/command_factory')
  commandFactory(@Res() res) {
    res.render('./pattern/command_factory.html', {
      title: '命令模式',
      mainMenu: 'command_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/intermediary_factory')
  intermediaryFactory(@Res() res) {
    res.render('./pattern/intermediary_factory.html', {
      title: '中介模式',
      mainMenu: 'intermediary_factory',
      toggleMenu: 'pattern'
    });
  }

  @Get('/interpreter_factory')
  interpreterFactory(@Res() res) {
    res.render('./pattern/interpreter_factory.html', {
      title: '解释器模式',
      mainMenu: 'interpreter_factory',
      toggleMenu: 'pattern'
    });
  }
}
