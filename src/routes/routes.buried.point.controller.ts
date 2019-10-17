import { Get, Controller, Req, Res, Next } from '@nestjs/common';

@Controller('/buried')
export class RoutesBuriedController {
  @Get('/performance')
  array(@Res() res) {
    res.render('./buried/performance.html', {
      title: '页面性能',
      mainMenu: 'performance',
      toggleMenu: 'buried'
    });
  }
}
