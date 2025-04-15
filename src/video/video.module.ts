import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { WhitelistIpModule } from 'src/whitelist-ip/whitelist-ip.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  WhitelistIpModule
],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
