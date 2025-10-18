import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountingblogService } from './countingblog.service';
import { CountingblogController } from './countingblog.controller';
import { CountingBlog, CountingBlogSchema } from './entities/countingblog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CountingBlog.name, schema: CountingBlogSchema },
    ]),
  ],
  controllers: [CountingblogController],
  providers: [CountingblogService],
  exports: [CountingblogService],
})
export class CountingblogModule {}
