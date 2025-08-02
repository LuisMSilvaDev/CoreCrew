import { Injectable } from "@nestjs/common";
import { RolesService } from "src/Roles/roles.service";
import { UUID } from "crypto";

export type User = {
    UserId: UUID;
    UserName: string;
    Password: string;
}

const users: User[] = [
    { UserId: "7e9d4b43-c0db-4ce5-b5a5-b0dad22d1761", UserName: "ArturCunha", Password: "123123" },
    { UserId: "22e92a96-712d-4076-b003-1357b01536f2", UserName: "LuisSilva", Password: "123123" }
];

@Injectable()
export class UserService {
    constructor(private readonly rolesService: RolesService) {}

    async findUserByName(userName: string): Promise<User | undefined> {
        var roles = await this.rolesService.GetAllRoles();
        console.log(roles)
        return users.find(user => user.UserName === userName); 
    }
}