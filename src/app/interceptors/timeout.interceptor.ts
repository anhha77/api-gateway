import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError, TimeoutError } from 'rxjs';
  import { catchError, timeout } from 'rxjs/operators';
  
  @Injectable()
  export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        timeout(30000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(
              new RequestTimeoutException({
                status_code: HttpStatus.REQUEST_TIMEOUT,
                message: 'Request Timeout',
              }),
            );
          }
          return throwError(err);
        }),
      );
    }
  }
  