import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(BadRequestException)
  export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      response
        .status(status)
        // you can manipulate the response here
        .json({
          status_code: status,
          message: 'Input validation error',
        });
    }
  }
  