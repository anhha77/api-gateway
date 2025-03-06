import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class RequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
  
      return next.handle().pipe(
        tap(() => {
          const httpContext = context.switchToHttp();
          const req = httpContext.getRequest();
          const res = httpContext.getResponse();
  
          res.on('finish', () => {
            Logger.log(
              `${req.method} {${req.url}} ${res.statusCode} ${res.getHeader(
                'content-length',
              )} ${Date.now() - now}ms`,
              context.getClass().name,
            );
          });
        }),
      );
    }
  }
  