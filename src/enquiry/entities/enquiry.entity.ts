import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Enquiry extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  partnerType: string;

  @Prop({ required: true })
  serviceRequired: string;

  @Prop()
  additionalRequirements: string;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
