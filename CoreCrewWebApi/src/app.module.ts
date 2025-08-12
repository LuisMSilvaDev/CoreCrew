import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './App/app.controller';
import { AppService } from './App/app.service';
import { UserModule } from './Users/users.module';
import { CommonModule } from './common/common.module';
import { AuthController } from './Auth/auth.controller';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CommonModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}