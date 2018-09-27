import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  test(): string {
    return 'Hello World!';
  }
}
