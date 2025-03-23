import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discography, DiscographyDocument } from './schemas/discography.schema';

@Injectable()
export class DiscographyService {
  constructor(@InjectModel(Discography.name) private discographyModel: Model<DiscographyDocument>) {}

  async findAll(): Promise<Discography[]> {
    return this.discographyModel.find().exec();
  }

  async findOne(id: string): Promise<Discography> {
    return this.discographyModel.findById(id).exec();
  }

  async create(discographyData: Partial<Discography>): Promise<Discography> {
    const newDiscography = new this.discographyModel(discographyData);
    return newDiscography.save();
  }

  async update(id: string, updateData: Partial<Discography>): Promise<Discography> {
    return this.discographyModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Discography> {
    return this.discographyModel.findByIdAndDelete(id).exec();
  }
}