// create-dashboard.dto.ts
import { IsOptional, IsString, IsDateString, IsArray, IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDashboardDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'User is required' })
  user: string; // normal user

  @IsOptional()
  @IsString()
  author?: string; // admin

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  @IsNotEmpty({ message: 'Meta Title is required' })
  metaTitle: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsDateString()
  publishDate?: Date;

  @IsDateString()
  @IsNotEmpty({ message: 'Expiry Date is required' })
  expiryDate: Date;

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  visibilityStatus?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  is_featured?: boolean;
}
