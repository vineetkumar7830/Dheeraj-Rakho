import { IsOptional, IsString, IsArray, IsDateString, IsBoolean } from 'class-validator';

export class UpdateCountingblogDto {
  @IsOptional()
   @IsString()
   title?: string;

  @IsOptional()
   @IsString() 
  author?: string;

  @IsOptional()
   @IsString()
    content?: string;

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
    is_featured?: boolean;

  @IsOptional()
   @IsString()
    summary?: string;

  @IsOptional()
   @IsString() 
   image?: string;

  @IsOptional()
   comments?: any[];
}
