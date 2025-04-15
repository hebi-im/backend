import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Banner, BannerDocument } from './schemas/banner.schema'
import {
  BannerResponseDto,
  CreateBannerDto,
  UpdateBannerDto,
} from './dto/banner.dto'
import APIException from 'src/common/dto/APIException.dto'

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {}

  async findAll(): Promise<BannerResponseDto[]> {
    const docs = await this.bannerModel.find().sort({ endDate: -1 })
    return docs.map((doc) => this.toResponseDto(doc))
  }

  async create(dto: CreateBannerDto): Promise<BannerResponseDto> {
    const created = await this.bannerModel.create(dto)
    return this.toResponseDto(created)
  }

  async update(id: string, dto: UpdateBannerDto): Promise<BannerResponseDto> {
    const updated = await this.bannerModel.findByIdAndUpdate(id, dto, {
      new: true,
    })

    if (!updated) {
      throw new APIException(HttpStatus.NOT_FOUND, 'Banner not found.')
    }

    return this.toResponseDto(updated)
  }

  async delete(id: string): Promise<BannerResponseDto> {
    const deleted = await this.bannerModel.findByIdAndDelete(id)

    if (!deleted) {
      throw new APIException(HttpStatus.NOT_FOUND, 'Banner not found.')
    }

    return this.toResponseDto(deleted)
  }

  private toResponseDto(doc: BannerDocument): BannerResponseDto {
    const { _id, __v, ...rest } = doc.toObject()
    return {
      id: _id.toString(),
      ...rest,
      startDate: rest.startDate.toISOString().split('T')[0],
      endDate: rest.endDate.toISOString().split('T')[0],
    }
  }
}
