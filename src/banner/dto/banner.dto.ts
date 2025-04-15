import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { LocaleText } from 'src/common/dto/locale-text.dto'

export class CreateBannerDto {
  @ApiProperty({ example: 'https://user-content.hebi.im/banners/banner1.jpg' })
  imageUrl: string

  @ApiPropertyOptional({ type: LocaleText })
  title?: LocaleText

  @ApiPropertyOptional({ type: LocaleText })
  description?: LocaleText

  @ApiPropertyOptional({ example: 'https://weverse.io/banner/1' })
  externalUrl?: string

  @ApiPropertyOptional({ example: '2025-04-01' })
  startDate?: string

  @ApiPropertyOptional({ example: '2025-04-10' })
  endDate?: Date
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}

export class BannerResponseDto {
  @ApiProperty({ example: '66138b38d232d3b0f894b789' })
  id: string

  @ApiProperty({ example: 'https://user-content.hebi.im/banners/banner1.jpg' })
  imageUrl: string

  @ApiPropertyOptional({ type: LocaleText })
  title?: LocaleText

  @ApiPropertyOptional({ type: LocaleText })
  description?: LocaleText

  @ApiPropertyOptional({ example: 'https://weverse.io/banner/1' })
  externalUrl?: string

  @ApiPropertyOptional({ example: '2025-04-01' })
  startDate?: Date

  @ApiPropertyOptional({ example: '2025-04-10' })
  endDate?: Date

  @ApiProperty({ example: '2025-04-03T14:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2025-04-03T15:00:00.000Z' })
  updatedAt: Date
}
