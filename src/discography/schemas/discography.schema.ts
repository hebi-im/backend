import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocaleText } from 'src/common/dto/locale-text.dto';

@Schema({ _id: true })
export class Track {
  @Prop({ type: Object, required: true })
  title: LocaleText;

  @Prop({ required: true })
  duration: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);

@Schema({ collection: 'discography', timestamps: true })
export class Discography {
  @Prop({ type: Object, required: true })
  title: LocaleText;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  coverImageUrl: string;

  @Prop()
  melonUrl?: string;

  @Prop({ type: Object })
  description?: LocaleText;

  @Prop({ type: [TrackSchema], default: [] })
  tracks?: Track[];
}

export type DiscographyDocument = Discography & Document;
export const DiscographySchema = SchemaFactory.createForClass(Discography);
