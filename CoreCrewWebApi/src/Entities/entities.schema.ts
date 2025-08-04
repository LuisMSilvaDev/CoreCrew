import { UUID } from "crypto";
import { ObjectId } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Entities {
    _id: ObjectId;
    
    @Prop()
    EntityId: UUID;

    @Prop()
    UserId: UUID;

    @Prop()
    Name: string;

    @Prop()
    Email: string;

    @Prop()
    PhoneNumber: string;

    @Prop({ default: Date.now })
    CreateDate: Date;

    @Prop()
    UpdateDate: Date;
}

export const EntitiesSchema = SchemaFactory.createForClass(Entities);

EntitiesSchema.index({ EntityId: 1 }, { unique: true });
EntitiesSchema.index({ UserId: 1 }, { unique: true });
EntitiesSchema.index({ CreateDate: 1 });
EntitiesSchema.index({ UpdateDate: 1 });