import { Controller, HttpCode, HttpStatus, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./Guards/auth.guard";
import { Types } from "mongoose";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() input: { username: string; password: string }) {
        if (!input.username) throw new Error("UserName is required");
        if (!input.password) throw new Error("Password is required");

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
        if (!input.UserName) throw new Error("UserName is required");
        if (!input.Name) throw new Error("Name is required");
        if (!input.Email) throw new Error("Email is required");
        if (!input.PhoneNumber) throw new Error("Phone Number is required");

        return this.authService.GenerateNewUser(input);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("FirstLoginInApp")
    FirstLoginInApp(@Body() input: { UserId: Types.ObjectId; PassWord: string; }) {
        if (!input.UserId) throw new Error("UserId is required");
        if (!input.PassWord) throw new Error("PassWord is required");
        
        return this.authService.firstLoginInApp(input);
    }
}   