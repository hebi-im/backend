import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhitelistIp, WhitelistIpDocument } from './schemas/whitelist-ip.schema';

@Injectable()
export class WhitelistIpService {
  constructor(
    @InjectModel(WhitelistIp.name)
    private readonly whitelistIpModel: Model<WhitelistIpDocument>,
  ) {}

  async isWhitelisted(ip: string): Promise<boolean> {
    const found = await this.whitelistIpModel.findOne({ ip });
    return !!found;
  }

  async addIp(ip: string): Promise<WhitelistIpDocument> {
    return this.whitelistIpModel.create({ ip });
  }

  async removeIp(ip: string): Promise<void> {
    await this.whitelistIpModel.deleteOne({ ip });
  }

  async getAll(): Promise<WhitelistIpDocument[]> {
    return this.whitelistIpModel.find().sort({ createdAt: -1 });
  }
}
