import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/buried')
export class RoutesBuriedController {
  @Get('/performance')
  performance(@Res() res) {
    res.render('./buried/performance.html', {
      title: '页面性能',
      mainMenu: 'performance',
      toggleMenu: 'buried'
    });
  }

  @Get('/buriedInfos')
  buriedInfos(@Res() res) {
    res.render('./buried/buriedInfos.html', {
      title: '埋点信息',
      mainMenu: 'buriedInfos',
      toggleMenu: 'buried'
    });
  }
}
