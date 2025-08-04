import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/Users/users.service";
import { Entity, Users } from "src/Users/users.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Types } from "mongoose";

var saltOrRounds: number = 10;
class AuthInput { username: string; password: string };
type AuthResult = { accessToken: string; userId: Types.ObjectId; username: string};
type FirstLoginInAppInput = { UserId: Types.ObjectId; PassWord: string; }
type GenerateUserInput = { UserName: string; Name: string; Email: string; PhoneNumber: string; }

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);
        if (!user) { throw new UnauthorizedException('Invalid credentials'); }

        const isMatch = await bcrypt.compare(input.password, user.PassWordHash) 
        if(isMatch === false) {
            throw new UnauthorizedException('Invalid credentials');
        }

        user.Roles = [new Types.ObjectId("689a3a1468ec3e6404de0bcf") ];
        await this.userService.updateUser(user._id, user);

        var roles = user.Roles;
        const tokenPayload = { sub: user._id, username: user.UserName, Roles: roles};
        const accessToken = await this.jwtService.sign(tokenPayload);
        
        return { accessToken, userId: user._id, username: user.UserName };
    }

    async firstLoginInApp(input: FirstLoginInAppInput): Promise<AuthResult> {
        const existingUser = await this.userService.findUserByUserId(input.UserId);

        if (existingUser) {
            const hashedPassword = await bcrypt.hash(input.PassWord, saltOrRounds);
            existingUser.PassWordHash = hashedPassword;
            existingUser.PassWordConfirmed = true;

            await this.userService.updateUser(existingUser._id, existingUser);
            var ai = new AuthInput();
            ai.username = existingUser.UserName,
            ai.password = input.PassWord

            return await this.login(ai);
        }
        else{
            throw new UnauthorizedException('User Does Not Exist');
        }
    }

    async GenerateNewUser(input: GenerateUserInput) {
        const existingUser = await this.userService.findUserByName(input.UserName);

        if(existingUser){
             throw new UnauthorizedException('User already Exist');
        }

        const newEntity = new Entity()
            newEntity.Name = input.Name;
            newEntity.Email = input.Email;
            newEntity.PhoneNumber = input.PhoneNumber;        

        const newUser = new Users();
            newUser.UserName = input.UserName;
            newUser.PassWordHash = "";
            newUser.PassWordConfirmed = false;
            newUser.Entity = newEntity;
            newUser.Roles = [];
        await this.userService.createUser(newUser);

        return { userId: newUser._id, username: newUser.UserName, Name: newEntity.Name };
    }

    async validateUser(input: AuthInput): Promise<Users | null> {
        const user = await this.userService.findUserByName(input.username);
        const isMatch = await bcrypt.compare(input.password, user.PassWordHash);

        if(user && isMatch) {
            return user;
        }

        return null;
    }
}