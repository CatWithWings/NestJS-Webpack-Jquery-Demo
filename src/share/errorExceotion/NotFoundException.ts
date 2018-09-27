import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: message,
      },
      404,
    );
  }
}
