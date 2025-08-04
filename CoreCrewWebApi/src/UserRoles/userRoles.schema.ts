import { UUID } from "crypto";
import { ObjectId } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserRoles {
    _id: ObjectId;
    
    @Prop()
    UserRoleId: UUID;

    @Prop()
    UserId: UUID;

    @Prop()
    RoleId: UUID;

    @Prop({ default: Date.now })
    CreateDate: Date;

    @Prop()
    UpdateDate: Date;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
UserRolesSchema.index({ UserRoleId: 1 }, { unique: true });
UserRolesSchema.index({ UserId: 1 }, { unique: true });
UserRolesSchema.index({ RoleId: 1 }, { unique: true });
UserRolesSchema.index({ CreateDate: 1 });
UserRolesSchema.index({ UpdateDate: 1 });