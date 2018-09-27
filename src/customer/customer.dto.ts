import { IsString, IsInt } from 'class-validator';

export class Customer {
  @IsString()
  name: string;

  @IsInt()
  tel: number;

  @IsString()
  company: string;

  @IsInt()
  view: number;

  @IsInt()
  isPublished: number;
}
