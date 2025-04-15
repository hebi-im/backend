import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LocaleText } from 'src/common/dto/locale-text.dto';
import { TrackDto, TrackResponseDto } from './track.dto';

export class CreateDiscographyDto {
  @ApiProperty({ type: LocaleText })
  title: LocaleText;

  @ApiProperty({ example: '2025-03-31' })
  releaseDate: Date;

  @ApiProperty({ example: 'https://cdn.hebi.im/covers/cover1.jpg' })
  coverImageUrl: string;

  @ApiPropertyOptional({ example: 'https://www.melon.com/album/detail.htm?albumId=0000000' })
  melonUrl?: string;

  @ApiPropertyOptional({ type: LocaleText })
  description?: LocaleText;

  @ApiPropertyOptional({ type: [TrackDto] })
  tracks?: TrackDto[];
}

export class UpdateDiscographyDto extends PartialType(CreateDiscographyDto) {}

export class DiscographyResponseDto extends CreateDiscographyDto {
  @ApiProperty({ example: '66138b38d232d3b0f894b789' })
  id: string;

  @ApiPropertyOptional({ type: [TrackResponseDto] })
  tracks?: TrackResponseDto[];

  @ApiProperty({ example: '2025-04-03T14:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-04-03T15:00:00.000Z' })
  updatedAt: Date;
}
