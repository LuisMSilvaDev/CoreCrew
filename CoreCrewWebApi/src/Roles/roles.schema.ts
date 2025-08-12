import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Roles {
    _id: Types.ObjectId;

    @Prop()
    Description:  string;

    @Prop()
    Acronym: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

// RolesSchema.pre('save', function(next) {
//     this.Description = this.Description.toUpperCase();
//     next();
// }); //Depois ver isto que pode ser fixe para LOGS