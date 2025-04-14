import { ApiProperty } from '@nestjs/swagger'

export class LocaleText {
  @ApiProperty({ example: '한국어 텍스트' })
  ko: string

  @ApiProperty({ example: 'English text' })
  en: string

  @ApiProperty({ example: '日本語テキスト' })
  jp: string
}
