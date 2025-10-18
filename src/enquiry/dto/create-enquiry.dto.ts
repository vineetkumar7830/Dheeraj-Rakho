import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateEnquiryDto {
  @IsString()
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone Number is required' })
  phoneNumber: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email Address is required' })
  email: string;

  @IsOptional()
  @IsString()
  partnerType?: string;

  @IsString()
  @IsNotEmpty({ message: 'Service Required is required' })
  serviceRequired: string;

  @IsOptional()
  @IsString()
  additionalRequirements?: string;
}
