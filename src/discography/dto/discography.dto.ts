import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateDiscographyDto {
  @ApiProperty({ example: 'Song Title', description: 'The title of the song' })
  title: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Release date of the song' })
  releaseDate: Date;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Thumbnail URL of the song' })
  thumbnail: string;
}

export class UpdateDiscographyDto extends PartialType(CreateDiscographyDto) {
    @ApiPropertyOptional({ example: 'New Song Title', description: 'Updated title of the song' })
    title?: string;
  
    @ApiPropertyOptional({ example: '2024-02-01T00:00:00.000Z', description: 'Updated release date of the song' })
    releaseDate?: Date;
  
    @ApiPropertyOptional({ example: 'https://example.com/new-image.jpg', description: 'Updated thumbnail URL of the song' })
    thumbnail?: string;
  }