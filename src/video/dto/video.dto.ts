import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LocaleText } from 'src/common/dto/locale-text.dto';

export class CreateVideoDto {
  @ApiProperty({ type: LocaleText })
  title: LocaleText;

  @ApiProperty({ example: 'MUSIC_VIDEO', enum: ['MUSIC_VIDEO', 'VLOG', 'LIVE', 'BEHIND', 'ETC'] })
  type: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=123' })
  externalUrl: string;

  @ApiPropertyOptional({ example: 'https://cdn.hebi.im/thumbs/video1.jpg' })
  thumbnailUrl?: string;

  @ApiPropertyOptional({ type: LocaleText })
  description?: LocaleText;

  @ApiProperty({ example: '2025-03-30' })
  uploadDate: Date;
}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}

export class VideoResponseDto extends CreateVideoDto {
  @ApiProperty({ example: '66138b38d232d3b0f894b789' })
  id: string;

  @ApiProperty({ example: '2025-04-03T14:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-04-03T15:00:00.000Z' })
  updatedAt: Date;
}
