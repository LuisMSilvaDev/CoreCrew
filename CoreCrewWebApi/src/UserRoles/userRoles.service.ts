import { Injectable } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { UserRoles } from "./userRoles.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UUID } from "crypto";

@Injectable()
export class UserRolesService {
    constructor(
        @InjectModel(UserRoles.name)
        private userRolesModel: Model<UserRoles>
    ) {}

    async GetAllUserRoles() {
        return await this.userRolesModel.find().exec();
    } 

    async GetUserRoleById(id: UUID) {
        return await this.userRolesModel.findById(id).exec();
    } 

     async GetRoleIdsByUserId(userId: UUID): Promise<UUID[] | null> {
        const roles = await this.userRolesModel.find({ UserId: userId }).exec();
        if (!roles) return null;
        return roles.map(role => role.RoleId);
    } 

    async InsertUserRole(role: UserRoles) {
        return await this.userRolesModel.create(role);
    }

    async DeleteUserRole(id: UUID) {
        const role = await this.userRolesModel.findById(id);
        return await role.deleteOne();
    }
}