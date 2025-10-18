import { IsEmail, IsNotEmpty, IsOptional,IsString,MinLength, MaxLength } from 'class-validator';

export class updateUserdto {
 @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email?: string;

 @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  password?: string;

 @IsOptional()
  @IsString()
  fullName?: string;

 @IsOptional()
  @IsString()
  username?: string;



 @IsOptional()
  @IsString()
  phone?: string;

 
 @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
