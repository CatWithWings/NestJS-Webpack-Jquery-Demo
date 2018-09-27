import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: message,
      },
      403,
    );
  }
}
