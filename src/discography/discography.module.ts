import { Module } from '@nestjs/common';
import { DiscographyController } from './discography.controller';
import { DiscographyService } from './discography.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Discography, DiscographySchema } from './schemas/discography.schema';
import { WhitelistIpModule } from 'src/whitelist-ip/whitelist-ip.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discography.name, schema: DiscographySchema }]),
  WhitelistIpModule
],
  controllers: [DiscographyController],
  providers: [DiscographyService],
})
export class DiscographyModule {}
