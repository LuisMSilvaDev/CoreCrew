import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Roles, RolesSchema } from "./roles.schema";

@Module({
  providers: [RolesService],
  exports: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
})
export class RolesModule {}