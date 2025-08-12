import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Entity { Name: string; Email: string; PhoneNumber: string; }

@Schema()
export class Users {
    _id: Types.ObjectId;

    @Prop()
    UserName:  string;

    @Prop()
    PassWordHash: string;

    @Prop()
    PassWordConfirmed: boolean;

    @Prop()
    Entity: Entity;

    @Prop()
    Roles: Types.ObjectId[];
    
    @Prop({ default: Date.now })
    CreateDate: Date;

    @Prop()
    UpdateDate: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
UsersSchema.index({ CreateDate: 1 });
UsersSchema.index({ UpdateDate: 1 });