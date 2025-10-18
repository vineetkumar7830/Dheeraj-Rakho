import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: false, unique: true })
  email?: string;

  @Prop({ required: false })
  password: string;

    @Prop({ required: false })
  fullName?: string;

  @Prop({ required: false,  })
  username?: string;


  @Prop({ required: false })
  phone?: string;


  @Prop({ required: false })
  role?: string;

  @Prop()
  bio?: string;

  @Prop()
  profilePicture?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
