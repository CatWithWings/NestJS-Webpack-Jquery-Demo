import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data {
  code?: number;
  data: any;
  msg?: string;
  statusCode: number;
}

export interface Response {
  code: number;
  data: Data;
  msg: string;
  ok: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<Data, Response> {
  intercept(
    context: ExecutionContext,
    call$: Observable<Data>,
  ): Observable<Response> {
    return call$.pipe(
      map(data => {
        return {
          code: data.code ? data.code : 0,
          data: data.data,
          msg: data.msg ? data.msg : 'OK',
          ok: data.statusCode === 200 ? true : false,
        };
      }),
    );
  }
}
