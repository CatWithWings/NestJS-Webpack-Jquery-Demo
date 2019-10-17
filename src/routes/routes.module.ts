import { Module } from '@nestjs/common';
import { RoutesPatternController } from './routes.pattern.controller';
import { RoutesArithmeticController } from './routes.arithmetic.controller';
import { RoutesShadowDomController } from './routes.shadowDom.controller';
import { RoutesIndexController } from './routes.index.controller';
import { RoutesBuriedController } from './routes.buried.point.controller';
import { from } from 'rxjs';

@Module({
  imports: [],
  controllers: [
    RoutesPatternController,
    RoutesArithmeticController,
    RoutesShadowDomController,
    RoutesIndexController,
    RoutesBuriedController
  ],
})
export class RoutesModule {}
