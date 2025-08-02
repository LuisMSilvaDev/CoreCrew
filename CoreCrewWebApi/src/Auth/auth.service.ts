import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UUID } from "crypto";
import { UserService } from "src/Users/user.service";
import { JwtService } from "@nestjs/jwt";

type AuthInput = { username: string; password: string }
type SignInData = { userId: UUID; username: string }
type AuthResult = { accessToken: string; userId: UUID; username: string};

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);
        if (!user) { throw new UnauthorizedException('Invalid credentials'); }

        const tokenPayload = { sub: user.userId, username: user.username, Roles: [1, 2, 3]};
        const accessToken = await this.jwtService.sign(tokenPayload);
        
        return { accessToken, userId: user.userId, username: user.username };
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username);

        if(user && user.Password === input.password) {
            return {
                userId: user.UserId,
                username: user.UserName
            };
        }

        return null;
    }
}