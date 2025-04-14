import { Module } from '@nestjs/common';
import { DiscographyController } from './discography.controller';
import { DiscographyService } from './discography.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Discography, DiscographySchema } from './schemas/discography.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discography.name, schema: DiscographySchema }])],
  controllers: [DiscographyController],
  providers: [DiscographyService],
})
export class DiscographyModule {}
