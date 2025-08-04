import { Controller, HttpCode, HttpStatus, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./Guards/auth.guard";
import { UUID } from "crypto";

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

    @HttpCode(HttpStatus.OK)
    @Post("GenerateNewUser")
    GenerateNewUser(@Body() input: { UserName: string; Name: string; Email: string; PhoneNumber: string; }) {
        return this.authService.GenerateNewUser(input);
    }

    @HttpCode(HttpStatus.OK)
    @Post("FirstLoginInApp")
    FirstLoginInApp(@Body() input: { UserId: UUID; PassWord: string; }) {
        return this.authService.firstLoginInApp(input);
    }
}   