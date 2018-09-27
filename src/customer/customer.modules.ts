import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entitys/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schemas/customer.schemas';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';

import { CustomerService } from './customer.server';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer], 'my_first_nest'),
    MongooseModule.forFeature([{ name: 'foods', schema: FoodSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AuthService, JwtStrategy],
})
export class CustomerModule {}
