import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';

@Module({
  imports: [],
  controllers: [RoutesController],
})
export class RoutesModule {}
