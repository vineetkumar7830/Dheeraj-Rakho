import { IsOptional, IsString } from 'class-validator';

export class UpdateAddcommentDto {
  @IsString()
  blogId: string;

  @IsString()
  commentId: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  content?: string;
}