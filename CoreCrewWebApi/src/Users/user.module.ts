import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { RolesModule } from "src/Roles/roles.module";

@Module({
  imports: [RolesModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}