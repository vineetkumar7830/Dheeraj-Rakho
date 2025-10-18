// update-dashboard.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardDto } from './create-dashboard.dto';
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateDashboardDto extends PartialType(CreateDashboardDto) {
  @IsString()
  @IsNotEmpty({ message: 'Title is required for update' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'User is required for update' })
  user: string;

  @IsString()
  @IsNotEmpty({ message: 'Meta Title is required for update' })
  metaTitle: string;

  @IsDateString({}, { message: 'Expiry Date must be valid ISO 8601' })
  @IsNotEmpty({ message: 'Expiry Date is required for update' })
  expiryDate: Date;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  is_featured?: boolean;
}
