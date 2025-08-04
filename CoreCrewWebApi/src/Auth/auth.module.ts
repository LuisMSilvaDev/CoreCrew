import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../Users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { EntitiesModule } from "../Entities/entities.module";
import { UserRolesModule } from "src/UserRoles/userRoles.module";

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    EntitiesModule,
    UserRolesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    })
  ],
})
export class AuthModule {}