import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Roles } from "./roles.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UUID } from "crypto";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Roles.name)
        private roleModel: Model<Roles>
    ) {}

    async GetAllRoles() {
        return await this.roleModel.find().exec();
    } 

    async GetRoleById(id: UUID) {
        return await this.roleModel.findById(id).exec();
    } 

    async UpdateRole(id: UUID, role: Partial<Roles>) {
        return await this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
    }

    async InsertRole(role: Roles) {
        return await this.roleModel.create(role);
    }

    async DeleteRole(id: UUID) {
        const role = await this.roleModel.findById(id);
        return await role.deleteOne();
    }
}