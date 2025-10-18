import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'countingblogs', timestamps: true })
export class CountingBlog extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) author: string;
  @Prop() content: string;
  @Prop() slug: string;
  @Prop() excerpt: string;
  @Prop() category: string;
  @Prop([String]) tags: string[];
  @Prop() featured_image: string;
  @Prop() meta_title: string;
  @Prop() meta_description: string;
  @Prop() keywords: string;
  @Prop() publish_date: Date;
  @Prop() expiry_date: Date;
  @Prop() visibility: string;
  @Prop() status: string;
  @Prop() is_featured: boolean;
  @Prop() summary: string;
  @Prop() image: string;
  @Prop([{ 
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    replies: [{
      _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
      author: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
    }],
  }]) comments: any[];
}

export const CountingBlogSchema = SchemaFactory.createForClass(CountingBlog);
