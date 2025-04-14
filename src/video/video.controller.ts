import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoDto, UpdateVideoDto, VideoResponseDto } from './dto/video.dto';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all video records' })
  async findAll(): Promise<VideoResponseDto[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video record based on ID' })
  async findOne(@Param('id') id: string): Promise<VideoResponseDto> {
    return this.videoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a video record' })
  async create(@Body() dto: CreateVideoDto): Promise<VideoResponseDto> {
    return this.videoService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a video record based on ID' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVideoDto,
  ): Promise<VideoResponseDto> {
    return this.videoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video record based on ID' })
  async delete(@Param('id') id: string):Promise<VideoResponseDto> {
    return this.videoService.delete(id);
  }
}
