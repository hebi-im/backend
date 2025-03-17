import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscographyDocument = Discography & Document;

@Schema({collection: 'discography'})
export class Discography {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: Date })
  releaseDate: Date;

  @Prop({ required: true, type: String })
  thumbnail: string;
}

export const DiscographySchema = SchemaFactory.createForClass(Discography);