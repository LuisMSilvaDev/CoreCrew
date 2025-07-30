import { Controller, Get, Param } from '@nestjs/common';

@Controller('Entity')
export class EntityController {
  constructor() {}

  @Get('GetAll/:id')
  GetAll(@Param() params: any): object {
    return {
      status: 'ok ' + params.id + ' ' + params.id2,
      message: 'CoreCrew API is running',
      timestamp: new Date().toISOString()
    };
  }
}
