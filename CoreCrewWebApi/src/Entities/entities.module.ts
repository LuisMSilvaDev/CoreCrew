import { Module } from "@nestjs/common";
import { EntitiesService } from "./entities.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Entities, EntitiesSchema } from "./entities.schema";

@Module({
  providers: [EntitiesService],
  exports: [EntitiesService],
  imports: [
    MongooseModule.forFeature([{ name: Entities.name, schema: EntitiesSchema }]),
  ],
})
export class EntitiesModule {}