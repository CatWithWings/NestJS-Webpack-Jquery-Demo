import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      500,
    );
  }
}
