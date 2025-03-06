import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(NotFoundException)
  export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const messages = exception.message;
  
      response
        .status(status)
        // you can manipulate the response here
        .json({
          status_code: status,
          message: messages,
        });
    }
  }
  