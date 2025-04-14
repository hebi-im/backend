import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { LocaleText } from 'src/common/dto/locale-text.dto'

export class CreateNewsDto {
  @ApiProperty({ type: LocaleText })
  title: LocaleText

  @ApiProperty({ type: LocaleText })
  content: LocaleText

  @ApiPropertyOptional({ example: 'https://cdn.hebi.im/thumbs/news1.jpg' })
  thumbnailUrl?: string

  @ApiPropertyOptional({ example: 'https://weverse.io/official/post/1' })
  externalUrl?: string
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}

export class NewsResponseDto {
  @ApiProperty({ example: '66138b38d232d3b0f894b789' })
  id: string

  @ApiProperty({ type: LocaleText })
  title: LocaleText

  @ApiProperty({ type: LocaleText })
  content: LocaleText

  @ApiPropertyOptional({ example: 'https://cdn.hebi.im/thumbs/news1.jpg' })
  thumbnailUrl?: string

  @ApiPropertyOptional({ example: 'https://weverse.io/official/post/1' })
  externalUrl?: string

  @ApiProperty({ example: '2025-04-03T14:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2025-04-03T15:00:00.000Z' })
  updatedAt: Date
}
