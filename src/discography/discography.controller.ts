import { Controller, Get, Post, Put, Delete, Param, Body, Patch, UseGuards } from '@nestjs/common';
import { DiscographyService } from './discography.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDiscographyDto, UpdateDiscographyDto } from './dto/discography.dto';
import { DiscographyResponseDto } from './dto/discography.dto';
import { ApiKeyAndIpAuthGuard } from 'src/whitelist-ip/api-key-ip-auth.guard';

@ApiTags('Discography')
@Controller('discography')
export class DiscographyController {
  constructor(private readonly discographyService: DiscographyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all discography records' })
  async findAll(): Promise<DiscographyResponseDto[]> {
    return this.discographyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discography record based on ID' })
  async findOne(@Param('id') id: string): Promise<DiscographyResponseDto> {
    return this.discographyService.findOne(id);
  }

  @UseGuards(ApiKeyAndIpAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a discography record' })
  async create(
    @Body() discographyData: CreateDiscographyDto,
  ): Promise<DiscographyResponseDto> {
    return this.discographyService.create(discographyData);
  }

  @UseGuards(ApiKeyAndIpAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a discography record based on ID' })
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateDiscographyDto,
  ): Promise<DiscographyResponseDto> {
    return this.discographyService.update(id, updateData);
  }

  @UseGuards(ApiKeyAndIpAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discography record based on ID' })
  async delete(@Param('id') id: string): Promise<DiscographyResponseDto> {
    return this.discographyService.delete(id);
  }
}
