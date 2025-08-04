import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./users.schema";
import { Model, Types } from "mongoose";

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
    
    async findUserByUserId(userId: Types.ObjectId) {
        return await this.userModel.findById(userId).exec();
    }

    async createUser(user: Users) {
        return await this.userModel.create(user);
    }

    async updateUser(userId: Types.ObjectId, user: Partial<Users>) {
        return await this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec();
    }
    
    async deleteUser(_id: Types.ObjectId) {
        const user = await this.findUserByUserId(_id);
        return await user.deleteOne();
    }
}