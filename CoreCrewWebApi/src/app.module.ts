import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './App/app.controller';
import { EntityController } from './Entities/Entity.controller';
import { AppService } from './App/app.service';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/corecrew'),
    UserModule
  ],
  controllers: [AppController, EntityController],
  providers: [AppService],
})
export class AppModule {}
