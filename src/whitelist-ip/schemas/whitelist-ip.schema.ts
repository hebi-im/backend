import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'whitelistIp', timestamps: true })
export class WhitelistIp {
  @Prop({ required: true, unique: true })
  ip: string;

  createdAt: Date;
  updatedAt: Date;
}

export type WhitelistIpDocument = WhitelistIp & Document;
export const WhitelistIpSchema = SchemaFactory.createForClass(WhitelistIp);
