import { Module } from "@nestjs/common";
import { UserRolesService } from "./userRoles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRoles, UserRolesSchema } from "./userRoles.schema";

@Module({
  providers: [UserRolesService],
  exports: [UserRolesService],
  imports: [
    MongooseModule.forFeature([{ name: UserRoles.name, schema: UserRolesSchema }]),
  ],
})
export class UserRolesModule {}