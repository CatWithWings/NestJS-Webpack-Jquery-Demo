import { Module } from '@nestjs/common';
import { RoutesPatternController } from './routes.pattern.controller';
import { RoutesArithmeticController } from './routes.arithmetic.controller';
import { RoutesIndexController } from './routes.index.controller';
import { from } from 'rxjs';

@Module({
  imports: [],
  controllers: [
    RoutesPatternController,
    RoutesArithmeticController,
    RoutesIndexController
  ],
})
export class RoutesModule {}
