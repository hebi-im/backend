import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocaleText } from 'src/common/dto/locale-text.dto';

@Schema({ collection: 'video', timestamps: true })
export class Video {
  @Prop({ type: Object, required: true })
  title: LocaleText;

  @Prop({ required: true, enum: ['MUSIC_VIDEO', 'VLOG', 'LIVE', 'BEHIND', 'ETC'] })
  type: string;

  @Prop({ required: true })
  externalUrl: string;

  @Prop()
  thumbnailUrl?: string;

  @Prop({ type: Object })
  description?: LocaleText;

  @Prop({ required: true })
  uploadDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
