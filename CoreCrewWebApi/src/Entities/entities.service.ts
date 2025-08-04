import { Injectable } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { Entities } from "./entities.Schema";
import { InjectModel } from "@nestjs/mongoose";
import { UUID } from "crypto";

@Injectable()
export class EntitiesService {
    constructor(
        @InjectModel(Entities.name)
        private entityModel: Model<Entities>
    ) {}

    async GetAllEntities() {
        return await this.entityModel.find().exec();
    } 

    async GetEntityById(id: UUID) {
        return await this.entityModel.findById(id).exec();
    } 

    async UpdateEntity(id: ObjectId, role: Partial<Entities>) {
        return await this.entityModel.findByIdAndUpdate(id, role, { new: true }).exec();
    }

    async InsertEntity(role: Entities) {
        return await this.entityModel.create(role);
    }

    async DeleteEntity(id: UUID) {
        const role = await this.entityModel.findById(id);
        return await role.deleteOne();
    }
}