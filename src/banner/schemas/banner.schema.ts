import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { LocaleText } from 'src/common/dto/locale-text.dto'

@Schema({ collection: 'banner', timestamps: true })
export class Banner {
  @Prop({ required: true })
  imageUrl: string

  @Prop({ type: Object })
  title?: LocaleText

  @Prop({ type: Object })
  description?: LocaleText

  @Prop()
  externalUrl?: string

  @Prop()
  startDate?: Date

  @Prop()
  endDate?: Date

  createdAt: Date
  updatedAt: Date
}
export type BannerDocument = Banner & Document
export const BannerSchema = SchemaFactory.createForClass(Banner)
