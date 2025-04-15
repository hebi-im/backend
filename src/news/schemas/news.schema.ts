import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { LocaleText } from 'src/common/dto/locale-text.dto'

@Schema({ collection: 'news', timestamps: true })
export class News {
  @Prop({ type: Object, required: true })
  title: LocaleText

  @Prop({ type: Object, required: true })
  content: LocaleText

  @Prop()
  thumbnailUrl?: string

  @Prop()
  externalUrl?: string

  createdAt: Date
  updatedAt: Date
}
export type NewsDocument = News & Document
export const NewsSchema = SchemaFactory.createForClass(News)
