import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || responseObj.error || message;
        
        if (responseObj.message && Array.isArray(responseObj.message)) {
          errors = responseObj.message;
          message = 'Validation failed';
        } else if (typeof responseObj.message === 'string') {
          message = responseObj.message;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unexpected error: ${exception.message}`, exception.stack);
    }

    // Skip logging for 404 errors and favicon requests to keep console clean
    if (status !== 404 && request.url !== '/favicon.ico') {
      this.logger.error(
        `${request.method} ${request.url} - ${status} - ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    const meta = {
      path: request.url,
      method: request.method
    };

    const errorResponse = ApiResponseDto.error(
      status,
      message,
      errors.length > 0 ? errors : null,
      meta
    );

    if (request.headers['x-request-id']) {
      errorResponse.requestId = request.headers['x-request-id'] as string;
    }

    response.status(status).json(errorResponse);
  }
}
