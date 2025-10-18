// dashboard.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Dashboard extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  user: string; // normal user

  @Prop()
  author?: string; // admin

  @Prop()
  slug: string;

  @Prop()
  category?: string;

  @Prop()
  content?: string;

  @Prop()
  summary?: string;

  @Prop()
  excerpt?: string;

  @Prop({ required: true })
  metaTitle: string;

  @Prop()
  metaDescription?: string;

  @Prop([String])
  keywords?: string[];

  @Prop([String])
  tags?: string[];

  @Prop()
  publishDate?: Date;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop()
  featured_image?: string;

  @Prop()
  visibilityStatus?: string;

  @Prop({ default: 'Draft' })
  status?: string;

  @Prop({ default: false })
  is_featured?: boolean;
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
