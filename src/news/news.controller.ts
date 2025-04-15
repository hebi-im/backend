import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news records' })
  findAll() {
    return this.newsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a news record based on ID' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a news record' })
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a news record based on ID' })
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news record based on ID' })
  delete(@Param('id') id: string) {
    return this.newsService.delete(id)
  }
}
