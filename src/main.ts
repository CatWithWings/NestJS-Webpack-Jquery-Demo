import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as handlebars from 'express-handlebars';

import { roles } from './roles.config';
import { GlobalMiddleware } from './share/middleware/global.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.set('views', join(__dirname, '..', 'static/views/'));
  app.set('view engine', 'html');

  app.engine(
    '.html',
    handlebars({
      extname: '.html',
      layoutsDir: join(__dirname, '..', 'static/views/layouts/'),
      defaultLayout: 'main',
      partialsDir: join(__dirname, '..', 'static/views/layouts/partials/'),
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'static/public'));

  // 将所有的角色数据保存在req
  app.use((req, res, next) => {
    req.user = { roles };
    next();
  });

  // 全局中间件
  app.use(GlobalMiddleware);
  await app.listen(3000);
}
bootstrap();
