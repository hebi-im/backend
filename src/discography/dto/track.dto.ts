import { ApiProperty } from '@nestjs/swagger';
import { LocaleText } from 'src/common/dto/locale-text.dto';

export class TrackDto {
  @ApiProperty({ type: LocaleText })
  title: LocaleText;

  @ApiProperty({ example: '03:12' })
  duration: string;
}

export class TrackResponseDto extends TrackDto {
  @ApiProperty({ example: '66138b38d232d3b0f894b700' })
  id: string;
}
