import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UUID, randomUUID } from "crypto";
import { UserService } from "src/Users/users.service";
import { Users } from "src/Users/users.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { EntitiesService } from "src/Entities/entities.service";
import { Entities } from "src/Entities/entities.Schema";
import { UserRolesService } from "src/UserRoles/userRoles.service";

var saltOrRounds: number = 10;
class AuthInput { username: string; password: string };
type FirstLogInData = { userId: UUID; username: string, PassWordHash: string };
type SignInData = { userId: UUID; username: string, PassWordHash: string };
type AuthResult = { accessToken: string; userId: UUID; username: string};
type FirstLoginInAppInput = { UserId:UUID; PassWord: string; }
type GenerateUserInput = { UserName: string; Name: string; Email: string; PhoneNumber: string; }

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly entitiesService: EntitiesService,
        private readonly userRolesService: UserRolesService,
        private readonly jwtService: JwtService
    ) {}

    async login(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);
        if (!user) { throw new UnauthorizedException('Invalid credentials'); }

        const isMatch = await bcrypt.compare(input.password, user.PassWordHash) 
        if(isMatch === false) {
            throw new UnauthorizedException('Invalid credentials');
        }

        var roles = await this.userRolesService.GetRoleIdsByUserId(user.userId)
        const tokenPayload = { sub: user.userId, username: user.username, Roles: roles};
        const accessToken = await this.jwtService.sign(tokenPayload);
        
        return { accessToken, userId: user.userId, username: user.username };
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

        const newUser = new Users();
            newUser.UserId = randomUUID();
            newUser.UserName = input.UserName;
            newUser.PassWordHash = "";
            newUser.PassWordConfirmed = false;
        await this.userService.createUser(newUser);

        const newEntity = new Entities()
            newEntity.EntityId = randomUUID();
            newEntity.UserId = newUser.UserId;
            newEntity.Name = input.Name;
            newEntity.Email = input.Email;
            newEntity.PhoneNumber = input.PhoneNumber;        
        await this.entitiesService.InsertEntity(newEntity);

        return { userId: newUser.UserId, username: newUser.UserName, Name: newEntity.Name };
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username);
        const isMatch = await bcrypt.compare(input.password, user.PassWordHash);

        if(user && isMatch) {
            return {
                userId: user.UserId,
                username: user.UserName,
                PassWordHash: user.PassWordHash
            };
        }

        return null;
    }
}