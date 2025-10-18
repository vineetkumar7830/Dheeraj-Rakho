import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CountingBlog } from './entities/countingblog.entity';

@Injectable()
export class CountingblogService {
  constructor(
    @InjectModel(CountingBlog.name)
    private readonly blogModel: Model<CountingBlog>,
  ) {}

  private addImageURL(blog: any) {
    const baseURL = 'http://localhost:3000/uploads/';
    if (blog.featured_image && !blog.featured_image.startsWith('http')) {
      blog.featured_image = baseURL + blog.featured_image;
    }
    if (blog.image && !blog.image.startsWith('http')) {
      blog.image = baseURL + blog.image;
    }
    return blog;
  }

  async create(blogData: any) {
    try {
      if (!blogData.slug && blogData.title) {
        blogData.slug = blogData.title.toLowerCase().replace(/\s+/g, '-');
      }
      if (!blogData.publish_date) blogData.publish_date = new Date();

      const blog = new this.blogModel({
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const saved = await blog.save();
      return { status: 'success', message: 'Blog created successfully!', result: this.addImageURL(saved.toObject()) };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create blog: ' + error.message);
    }
  }

  async update(id: string, updateData: any) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid blog ID');

    const updated = await this.blogModel.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true });
    if (!updated) throw new NotFoundException('Blog not found');

    return { status: 'success', message: 'Blog updated successfully!', result: this.addImageURL(updated.toObject()) };
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid blog ID');

    const deleted = await this.blogModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Blog not found');

    return { status: 'success', message: 'Blog deleted successfully!', result: this.addImageURL(deleted.toObject()) };
  }

  async findAll() {
    const blogs = await this.blogModel.find().sort({ createdAt: -1 });
    return {
      status: 'success',
      message: 'All blogs fetched successfully!',
      total: blogs.length,
      result: blogs.map(blog => this.addImageURL(blog.toObject())),
    };
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid blog ID');
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return { status: 'success', result: this.addImageURL(blog.toObject()) };
  }

  async getTodayAndYesterdayBlogs() {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);

    const todayBlogs = await this.blogModel.find({ createdAt: { $gte: todayStart, $lte: todayEnd } });
    const yesterdayBlogs = await this.blogModel.find({ createdAt: { $gte: yesterdayStart, $lt: yesterdayEnd } });

    return {
      status: 'success',
      message: 'Fetched today and yesterday blogs successfully!',
      todayCount: todayBlogs.length,
      yesterdayCount: yesterdayBlogs.length,
      today: todayBlogs.map(blog => this.addImageURL(blog.toObject())),
      yesterday: yesterdayBlogs.map(blog => this.addImageURL(blog.toObject())),
    };
  }
}
