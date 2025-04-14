import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistIpService } from './whitelist-ip.service';
import { WhitelistIp, WhitelistIpSchema } from './schemas/whitelist-ip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WhitelistIp.name, schema: WhitelistIpSchema }]),
  ],
  providers: [WhitelistIpService],
  exports: [WhitelistIpService],
})
export class WhitelistIpModule {}
