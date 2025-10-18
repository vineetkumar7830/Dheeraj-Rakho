import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddcommentDto {
  @IsString()
  @IsNotEmpty()
  blogId: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
