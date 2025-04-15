import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { News, NewsDocument } from './schemas/news.schema'
import { NewsResponseDto, CreateNewsDto, UpdateNewsDto } from './dto/news.dto'
import APIException from 'src/common/dto/APIException.dto'

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  async findAll(): Promise<NewsResponseDto[]> {
    const docs = await this.newsModel.find().sort({ publishedDate: -1 })
    return docs.map((doc) => this.toResponseDto(doc))
  }

  async findOne(id: string): Promise<NewsResponseDto> {
    const doc = await this.newsModel.findById(id).exec()

    if (!doc) {
      throw new APIException(HttpStatus.NOT_FOUND, 'News not found.')
    }

    return this.toResponseDto(doc)
  }

  async create(dto: CreateNewsDto): Promise<NewsResponseDto> {
    const created = await this.newsModel.create(dto)
    return this.toResponseDto(created)
  }

  async update(id: string, dto: UpdateNewsDto): Promise<NewsResponseDto> {
    const updated = await this.newsModel.findByIdAndUpdate(id, dto, {
      new: true,
    })

    if (!updated) {
      throw new APIException(HttpStatus.NOT_FOUND, 'News not found.')
    }

    return this.toResponseDto(updated)
  }

  async delete(id: string): Promise<NewsResponseDto> {
    const deleted = await this.newsModel.findByIdAndDelete(id)

    if (!deleted) {
      throw new APIException(HttpStatus.NOT_FOUND, 'News not found.')
    }

    return this.toResponseDto(deleted)
  }

  private toResponseDto(doc: NewsDocument): NewsResponseDto {
    const { _id, __v, ...rest } = doc.toObject()
    return {
      id: _id.toString(),
      ...rest,
    }
  }
}
