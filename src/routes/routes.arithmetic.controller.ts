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

  @Get('/set')
  set(@Res() res) {
    res.render('./arithmetic/set.html', {
      title: '集合',
      mainMenu: 'set',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/dictionary')
  dictionary(@Res() res) {
    res.render('./arithmetic/dictionary.html', {
      title: '字典与散列表',
      mainMenu: 'dictionary',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/tree')
  tree(@Res() res) {
    res.render('./arithmetic/tree.html', {
      title: '树',
      mainMenu: 'tree',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/graph')
  graph(@Res() res) {
    res.render('./arithmetic/graph.html', {
      title: '图',
      mainMenu: 'graph',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/sort')
  sort(@Res() res) {
    res.render('./arithmetic/sort.html', {
      title: '排序',
      mainMenu: 'sort',
      toggleMenu: 'arithmetic'
    });
  }

  @Get('/models')
  models(@Res() res) {
    res.render('./arithmetic/models.html', {
      title: '算法模式',
      mainMenu: 'models',
      toggleMenu: 'arithmetic'
    });
  }
}
