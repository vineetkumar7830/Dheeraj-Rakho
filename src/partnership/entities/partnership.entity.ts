import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartnershipDocument = Partnership & Document;

@Schema({ timestamps: true })
export class Partnership {
  // Common fields
  @Prop({ required: true }) fullName: string;
  @Prop() phone?: string;
  @Prop({ required: true }) email: string;
  @Prop() city?: string;

  // Common partnership meta
  @Prop({ required: true, enum: ['Business Consultant','CA/Legal Professional','Regional Partner','Referral Partner','Other'] })
  partnershipType: string;

  // Business Consultant specific
  @Prop() businessAdvisoryExperience?: string; // select - can store chosen option
  @Prop() sizeOfExistingClientBase?: string; // select / enum
  @Prop() currentBusinessServiceAndProfessionalNetwork?: string; // textarea

  // CA/Legal Professional specific
  @Prop() professionalCertification?: string; // text
  @Prop() yearsOfProfessionalPractice?: string; // select / store as string
  @Prop() practiceDetailsAndClientRelationships?: string; // textarea

  // Regional Partner specific
  @Prop() businessSetupManagementExperience?: string; // select
  @Prop() investmentCapacity?: string; // select
  @Prop() localMarketKnowledgeAndBusinessPlan?: string; // textarea

  // Referral Partner specific
  @Prop() sizeOfYourProfessionalNetwork?: string; // select
  @Prop() experienceInBusinessDevelopmentSales?: string; // select
  @Prop() networkOfPotentialClientsAndCommunicationSkills?: string; // textarea

  // Generic fields map (in case you want more dynamic data)
  @Prop({ type: Object, default: {} }) extra?: Record<string, any>;
}

export const PartnershipSchema = SchemaFactory.createForClass(Partnership);
