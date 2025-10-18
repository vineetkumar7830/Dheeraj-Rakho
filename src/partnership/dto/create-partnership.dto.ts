import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartnershipDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsOptional() phone?: string;
  @IsEmail() @IsNotEmpty() email: string;
  @IsString() @IsOptional() city?: string;

  @IsString() @IsNotEmpty() partnershipType: string;

  // Business Consultant
  @IsString() @IsOptional() businessAdvisoryExperience?: string;
  @IsString() @IsOptional() sizeOfExistingClientBase?: string;
  @IsString() @IsOptional() currentBusinessServiceAndProfessionalNetwork?: string;

  // CA/Legal Professional
  @IsString() @IsOptional() professionalCertification?: string;
  @IsString() @IsOptional() yearsOfProfessionalPractice?: string;
  @IsString() @IsOptional() practiceDetailsAndClientRelationships?: string;

  // Regional Partner
  @IsString() @IsOptional() businessSetupManagementExperience?: string;
  @IsString() @IsOptional() investmentCapacity?: string;
  @IsString() @IsOptional() localMarketKnowledgeAndBusinessPlan?: string;

  // Referral Partner
  @IsString() @IsOptional() sizeOfYourProfessionalNetwork?: string;
  @IsString() @IsOptional() experienceInBusinessDevelopmentSales?: string;
  @IsString() @IsOptional() networkOfPotentialClientsAndCommunicationSkills?: string;

  @IsOptional() extra?: Record<string, any>;
}
