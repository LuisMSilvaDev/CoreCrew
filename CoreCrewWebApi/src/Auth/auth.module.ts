import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../Users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    })
  ],
})
export class AuthModule {}