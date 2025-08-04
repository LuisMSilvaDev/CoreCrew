import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ 
    description: 'HTTP status code', 
    example: 200,
    enum: [200, 201, 400, 401, 403, 404, 409, 422, 500]
  })
  httpStatus: number;

  @ApiProperty({ 
    description: 'Response message', 
    example: 'Operation completed successfully' 
  })
  message: string;

  @ApiProperty({ 
    description: 'Response data payload',
    nullable: true
  })
  data: T | null;

  @ApiProperty({ 
    description: 'Total count for paginated results',
    nullable: true,
    example: 100
  })
  total: number | null;

  @ApiProperty({ 
    description: 'Current page for pagination',
    nullable: true,
    example: 1
  })
  page: number | null;

  @ApiProperty({ 
    description: 'Items per page for pagination',
    nullable: true,
    example: 10
  })
  limit: number | null;

  @ApiProperty({ 
    description: 'Request timestamp',
    example: '2024-03-15T10:30:00Z'
  })
  timestamp: string;

  @ApiProperty({ 
    description: 'Request correlation ID for tracking',
    example: 'req_123456789'
  })
  requestId: string;

  @ApiProperty({ 
    description: 'Validation errors (for 400/422 responses)',
    nullable: true,
    type: [String]
  })
  errors: string[] | null;

  @ApiProperty({ 
    description: 'Additional metadata',
    nullable: true
  })
  meta: Record<string, any> | null;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
    this.timestamp = this.timestamp || new Date().toISOString();
    this.requestId = this.requestId || this.generateRequestId();
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static success<T>(data: T, message = 'Operation completed successfully', meta?: Record<string, any>): ApiResponseDto<T> {
    return new ApiResponseDto({
      httpStatus: 200,
      message,
      data,
      total: null,
      page: null,
      limit: null,
      errors: null,
      meta: meta || null
    });
  }

  static created<T>(data: T, message = 'Resource created successfully', meta?: Record<string, any>): ApiResponseDto<T> {
    return new ApiResponseDto({
      httpStatus: 201,
      message,
      data,
      total: null,
      page: null,
      limit: null,
      errors: null,
      meta: meta || null
    });
  }

  static paginated<T>(
    data: T[], 
    total: number, 
    page: number, 
    limit: number, 
    message = 'Data retrieved successfully'
  ): ApiResponseDto<T[]> {
    return new ApiResponseDto({
      httpStatus: 200,
      message,
      data,
      total,
      page,
      limit,
      errors: null,
      meta: {
        hasNext: page * limit < total,
        hasPrevious: page > 1,
        totalPages: Math.ceil(total / limit)
      }
    });
  }

  static error(httpStatus: number, message: string, errors?: string[], meta?: Record<string, any>): ApiResponseDto<null> {
    return new ApiResponseDto({
      httpStatus,
      message,
      data: null,
      total: null,
      page: null,
      limit: null,
      errors: errors || null,
      meta: meta || null
    });
  }
}
