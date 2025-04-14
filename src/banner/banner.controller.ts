import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { BannerService } from './banner.service'
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banner records' })
  findAll() {
    return this.bannerService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a banner record' })
  create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a banner record based on ID' })
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a banner record based on ID' })
  delete(@Param('id') id: string) {
    return this.bannerService.delete(id)
  }
}
