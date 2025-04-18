import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'

import KeyvRedis from '@keyv/redis'

import { AppController } from './app.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { DiscographyModule } from './discography/discography.module'
import { UploadModule } from './upload/upload.module'
import { NewsService } from './news/news.service'
import { NewsController } from './news/news.controller'
import { NewsModule } from './news/news.module'
import { BannerModule } from './banner/banner.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    process.env.ENABLE_REDIS === '1'
      ? CacheModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            stores: [new KeyvRedis(configService.getOrThrow('REDIS_URI'))],
          }),
          inject: [ConfigService],
          isGlobal: true,
        })
      : CacheModule.register({
          isGlobal: true,
        }),
    AppModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    DiscographyModule,
    UploadModule,
    NewsModule,
    BannerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
