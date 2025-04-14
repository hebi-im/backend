import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import APIException from 'src/common/dto/APIException.dto';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto, UpdateVideoDto, VideoResponseDto } from './dto/video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async create(dto: CreateVideoDto): Promise<VideoResponseDto> {
    const created = await this.videoModel.create(dto);
    return this.toResponseDto(created);
  }

  async findAll(): Promise<VideoResponseDto[]> {
    const docs = await this.videoModel.find().sort({ uploadDate: -1 });
    return docs.map((doc) => this.toResponseDto(doc));
  }

  async findOne(id: string): Promise<VideoResponseDto> {
    const doc = await this.videoModel.findById(id);
    if (!doc) throw new APIException(HttpStatus.NOT_FOUND, 'Video not found.');
    return this.toResponseDto(doc);
  }

  async update(id: string, dto: UpdateVideoDto): Promise<VideoResponseDto> {
    const updated = await this.videoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new APIException(HttpStatus.NOT_FOUND, 'Video not found.');
    return this.toResponseDto(updated);
  }

  async delete(id: string): Promise<VideoResponseDto> {
    const deleted = await this.videoModel.findByIdAndDelete(id);
    if (!deleted) throw new APIException(HttpStatus.NOT_FOUND, 'Video not found.');
    return this.toResponseDto(deleted);
  }

  private toResponseDto(doc: VideoDocument): VideoResponseDto {
    const { _id, __v, ...rest } = doc.toObject();
    return {
      id: _id.toString(),
      ...rest,
      uploadDate: rest.uploadDate.toISOString().split('T')[0],
    };
  }
}
