import { UUID } from "crypto";
import { ObjectId } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users {
    _id: ObjectId;
    
    @Prop()
    UserId: UUID;

    @Prop()
    UserName:  string;

    @Prop()
    PassWordHash: string;

    @Prop({ default: Date.now })
    CreateDate: Date;

    @Prop()
    UpdateDate: Date;

    @Prop()
    PassWordConfirmed: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
UsersSchema.index({ UserId: 1 }, { unique: true });
UsersSchema.index({ CreateDate: 1 });
UsersSchema.index({ UpdateDate: 1 });