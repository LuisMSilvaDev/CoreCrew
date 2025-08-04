import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './App/app.controller';
import { EntityController } from './Entities/Entity.controller';
import { AppService } from './App/app.service';
import { UserModule } from './Users/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule
  ],
  controllers: [AppController, EntityController],
  providers: [AppService],
})
export class AppModule {}
