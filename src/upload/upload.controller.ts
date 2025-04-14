import { Controller, Get, Query } from '@nestjs/common'
import { UploadService } from './upload.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('presigned-url')
  @ApiOperation({ summary: 'Generate a presigned URL for file upload' })
  async getPresignedUrl(
    @Query('filename') filename: string,
    @Query('type') type: string,
  ) {
    return this.uploadService.getPresignedUploadUrl(filename, type)
  }

  @Get('presigned-url/download')
  @ApiOperation({ summary: 'Generate a presigned URL for file download' })
  async getPresignedDownloadUrl(@Query('key') key: string) {
    return this.uploadService.getPresignedDownloadUrl(key)
  }
}
