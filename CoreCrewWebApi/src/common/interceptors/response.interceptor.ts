import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseDto<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'httpStatus' in data && 'message' in data) {
          return data;
        }

        const method = request.method;
        let message = 'Operation completed successfully';
        const httpStatus = response.statusCode || 200;

        switch (method) {
          case 'POST':
            message = 'Resource created successfully';
            break;
          case 'PUT':
          case 'PATCH':
            message = 'Resource updated successfully';
            break;
          case 'DELETE':
            message = 'Resource deleted successfully';
            data = null;
            break;
          case 'GET':
            if (Array.isArray(data)) {
              message = `Retrieved ${data.length} record(s) successfully`;
            } else {
              message = 'Resource retrieved successfully';
            }
            break;
        }

        if (data === undefined || data === '') {
          data = null;
        }

        return new ApiResponseDto({
          httpStatus,
          message,
          data,
          total: null,
          page: null,
          limit: null,
          errors: null,
          meta: null,
          requestId: request.headers['x-request-id'] || undefined
        });
      })
    );
  }
}
