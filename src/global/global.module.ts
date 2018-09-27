import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

@Module({
  imports: [],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GolbalModule {}
