import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DiscographyService } from './discography.service';
import { Discography } from './schemas/discography.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDiscographyDto, UpdateDiscographyDto } from './dto/discography.dto';

@ApiTags('Discography') 
@Controller('discography')
export class DiscographyController {
  constructor(private readonly discographyService: DiscographyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all discography records' })
  async findAll(): Promise<Discography[]> {
    return this.discographyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discography record based on ID' })
  async findOne(@Param('id') id: string): Promise<Discography> {
    return this.discographyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a discography record' })
  async create(@Body() discographyData: CreateDiscographyDto): Promise<Discography> {
    return this.discographyService.create(discographyData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a discography record based on ID' })
  async update(@Param('id') id: string, @Body() updateData: UpdateDiscographyDto): Promise<Discography> {
    return this.discographyService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discography record based on ID' })
  async delete(@Param('id') id: string): Promise<Discography> {
    return this.discographyService.delete(id);
  }
}