import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./users.schema";
import { Model, ObjectId } from "mongoose";
import { UUID } from "crypto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Users.name)
        private userModel: Model<Users>
    ) {}

    async findUserByName(userName: string): Promise<Users | null> {
        var user = await this.userModel.findOne({ UserName: userName }).exec();
        return user;
    }
    
    async findUserByUserId(userId: UUID): Promise<Users | null> {
        var user = await this.userModel.findOne({ UserId: userId }).exec();
        console.log("User found by ID: ", user);
        return user;
    }

    async createUser(user: Users) {
        return await this.userModel.create(user);
    }

    async updateUser(userId: ObjectId, user: Partial<Users>) {
        return await this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec();
    }
}