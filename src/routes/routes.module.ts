import { Module } from '@nestjs/common';
import { RoutesPatternController } from './routes.pattern.controller';
import { RoutesIndexController } from './routes.index.controller'
import { from } from 'rxjs';

@Module({
  imports: [],
  controllers: [
    RoutesPatternController,
    RoutesIndexController
  ],
})
export class RoutesModule {}
