import { Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';

import { Customer } from './entitys/customer.entity';
import { Foods } from './customer.interfaces';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectModel('foods') 
    private readonly foodsModel: Model<Foods>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async createCustomer(customerData): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findAllFoods(): Promise<Foods[]> {
    return await this.foodsModel.find().exec();
  }
}
