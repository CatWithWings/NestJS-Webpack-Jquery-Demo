import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { mySqlDBOptions1, mongoOptions1 } from './database.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './routes/routes.module';
import { GolbalModule } from './global/global.module';
import { CustomerModule } from './customer/customer.modules';

import { RouterMiddleware } from './share/middleware/root.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(mySqlDBOptions1),
    MongooseModule.forRoot(mongoOptions1.address),

    AuthModule,
    RoutesModule,
    CustomerModule,
    GolbalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RouterMiddleware) // 可以绑定多个中间件.apply(cors(), helmet(), logger)
      .with({ login: true })
      .forRoutes('/*');
  }
}
