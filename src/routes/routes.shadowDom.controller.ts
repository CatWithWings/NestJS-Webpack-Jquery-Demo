import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/shadowDom')
export class RoutesShadowDomController {
  @Get('/simple')
  simpleShadowDom(@Res() res) {
    res.render('./shadowDom/simpleShadow.html', {
      title: '影子节点-simple',
      mainMenu: 'simpleShadow',
      toggleMenu: 'shadowDom'
    });
  }

  @Get('/customerElement')
  customerElementShadowDom(@Res() res) {
    res.render('./shadowDom/customerElement.html', {
      title: '影子节点-自定义元素',
      mainMenu: 'customerElement',
      toggleMenu: 'shadowDom'
    });
  }
}
