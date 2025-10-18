import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'countingblogs', timestamps: true })
export class CountingBlog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  image: string;

  @Prop()
  summary: string;

  @Prop()
  content: string;

  // ✅ Comment Schema
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
        author: String,
        content: String,
        createdAt: { type: Date, default: Date.now },
        replies: [
          {
            _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
            author: String,
            content: String,
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    default: [],
  })
  comments: any[];
}

export const CountingBlogSchema = SchemaFactory.createForClass(CountingBlog);
