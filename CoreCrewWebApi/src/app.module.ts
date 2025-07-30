import { Module } from '@nestjs/common';
import { AppController } from './App/app.controller';
import { EntityController } from './Entities/Entity.controller';
import { AppService } from './App/app.service';

@Module({
  imports: [],
  controllers: [AppController, EntityController],
  providers: [AppService],
})
export class AppModule {}
