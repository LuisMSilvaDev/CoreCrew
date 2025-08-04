# API Response Features Guide

> **Note:** CommonModule is already configured globally. This guide shows what features are available when creating new controllers/services.

## 🎯 What You Get Automatically

All controllers automatically return standardized responses:

```json
{
  "httpStatus": 200,
  "message": "Retrieved 15 record(s) successfully", 
  "data": [...], // Your actual data
  "total": null,
  "page": null,
  "limit": null,
  "timestamp": "2024-03-15T10:30:00Z",
  "requestId": "req_abc123",
  "errors": null,
  "meta": null
}
```

## 🚀 Smart Messages by HTTP Method

- **GET** → "Retrieved X record(s) successfully"
- **POST** → "Resource created successfully" (201 status)
- **PUT/PATCH** → "Resource updated successfully"
- **DELETE** → "Resource deleted successfully"

## 📋 Available Response Helpers

### Basic Responses
```typescript
// In your service methods, just return the data:
async findAll(): Promise<CompanyResponseDto[]> {
  return companies; // Interceptor wraps this automatically
}

// For custom messages:
return ApiResponseDto.success(data, "Custom success message");
return ApiResponseDto.created(data, "Company created with special workflow");
```

### Pagination Support
```typescript
// For paginated endpoints:
return ApiResponseDto.paginated(companies, totalCount, currentPage, itemsPerPage);
// Result includes: hasNext, hasPrevious, totalPages in meta
```

### Error Responses
```typescript
// Errors are handled automatically, but you can throw:
throw new NotFoundException('Company not found');
throw new ConflictException('Email already exists');
// These become standardized error responses
```

## 🛡️ Error Handling Features

- **Validation errors** → Returns errors array with field messages
- **404 errors** → Clean responses, no console spam
- **Unique constraint violations** → Friendly conflict messages
- **All errors** → Same response structure as success

## 💡 Best Practices for New Modules

1. **Controllers**: Just return your DTOs, let the interceptor handle wrapping
2. **Services**: Focus on business logic, return clean data
3. **Validation**: Use class-validator decorators, errors are handled automatically
4. **Custom messages**: Use helper methods when default messages aren't enough

## 📚 Example New Controller

```typescript
@Controller('users')
export class UsersController {
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll(); // Auto-wrapped in API response
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto); // Auto-wrapped with 201 status
  }
}
```

That's it! Everything else is handled automatically. 🎉
