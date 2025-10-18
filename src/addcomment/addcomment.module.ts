import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddcommentService } from './addcomment.service';
import { AddcommentController } from './addcomment.controller';
import {
  CountingBlog,
  CountingBlogSchema,
} from '../countingblog/entities/countingblog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CountingBlog.name, schema: CountingBlogSchema },
    ]),
  ],
  controllers: [AddcommentController],
  providers: [AddcommentService],
})
export class AddcommentModule {}
