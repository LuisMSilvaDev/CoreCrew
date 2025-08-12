import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Roles } from "./roles.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Roles.name)
        private roleModel: Model<Roles>
    ) {}

    async GetAllRoles() {
        return await this.roleModel.find().exec();
    } 

    async GetRoleById(_id: Types.ObjectId) {
        return await this.roleModel.findById(_id).exec();
    } 

    async UpdateRole(_id: Types.ObjectId, role: Partial<Roles>) {
        return await this.roleModel.findByIdAndUpdate(_id, role, { new: true }).exec();
    }

    async InsertRole(role: Roles) {
        return await this.roleModel.create(role);
    }

    async DeleteRole(_id: Types.ObjectId) {
        const role = await this.GetRoleById(_id);
        return await role.deleteOne();
    }
}