import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import APIException from 'src/common/dto/APIException.dto';
import { Discography, DiscographyDocument } from './schemas/discography.schema';
import { CreateDiscographyDto, UpdateDiscographyDto, DiscographyResponseDto } from './dto/discography.dto';

@Injectable()
export class DiscographyService {
  constructor(
    @InjectModel(Discography.name)
    private readonly discographyModel: Model<DiscographyDocument>,
  ) {}

  async create(dto: CreateDiscographyDto): Promise<DiscographyResponseDto> {
    const created = await this.discographyModel.create(dto);
    return this.toResponseDto(created);
  }

  async findAll(): Promise<DiscographyResponseDto[]> {
    const docs = await this.discographyModel.find().sort({ releaseDate: -1 });
    return docs.map((doc) => this.toResponseDto(doc));
  }

  async findOne(id: string): Promise<DiscographyResponseDto> {
    const doc = await this.discographyModel.findById(id);
    if (!doc) throw new APIException(HttpStatus.NOT_FOUND, 'Discography not found.');
    return this.toResponseDto(doc);
  }

  async update(
    id: string,
    dto: UpdateDiscographyDto,
  ): Promise<DiscographyResponseDto> {
    const updated = await this.discographyModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new APIException(HttpStatus.NOT_FOUND, 'Discography not found.');
    return this.toResponseDto(updated);
  }

  async delete(id: string): Promise<DiscographyResponseDto> {
    const deleted = await this.discographyModel.findByIdAndDelete(id);
    if (!deleted) throw new APIException(HttpStatus.NOT_FOUND, 'Discography not found.');
    return this.toResponseDto(deleted);
  }

  private toResponseDto(doc: DiscographyDocument): DiscographyResponseDto {
    const { _id, __v, ...rest } = doc.toObject();

    const tracksWithId = rest.tracks?.map((track) => {
      const { _id, ...trackRest } = track;
      return { id: _id.toString(), ...trackRest };
    });

    return {
      id: _id.toString(),
      ...rest,
      tracks: tracksWithId,
    };
  }
}
