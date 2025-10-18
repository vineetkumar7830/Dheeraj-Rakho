import { IsNotEmpty, IsOptional, IsString, IsArray, IsDateString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCountingblogDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  tags?: string[];

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  meta_title?: string;

  @IsOptional()
  @IsString()
  meta_description?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsDateString()
  publish_date?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsString()
  visibility?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  is_featured?: boolean;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
