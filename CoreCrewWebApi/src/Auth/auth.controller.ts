import { Controller, HttpCode, HttpStatus, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./Guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() input: { username: string; password: string }) {
        return this.authService.login(input);
    }

    @UseGuards(AuthGuard)
    @Get("me")
    gerUserInfo(@Request() request) {
        return request.user;
    }
}   