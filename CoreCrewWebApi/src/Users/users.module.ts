import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}