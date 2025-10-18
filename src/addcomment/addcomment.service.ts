
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CountingBlog } from '../countingblog/entities/countingblog.entity';
import { CreateAddcommentDto } from './dto/create-addcomment.dto';
import { UpdateAddcommentDto } from './dto/update-addcomment.dto';

@Injectable()
export class AddcommentService {
  constructor(
    @InjectModel(CountingBlog.name)
    private readonly countingBlogModel: Model<CountingBlog>,
  ) {}

  async create(dto: CreateAddcommentDto) {
    try {
      const { blogId, author, content } = dto;

      if (!blogId || !author || !content) {
        throw new BadRequestException('Missing required fields: blogId, author, or content');
      }

      if (!Types.ObjectId.isValid(blogId)) {
        throw new BadRequestException(`Invalid blogId: ${blogId}`);
      }

      const blog = await this.countingBlogModel.findById(new Types.ObjectId(blogId));

      if (!blog) {
        const blogWithThatComment = await this.countingBlogModel.findOne({
          'comments._id': new Types.ObjectId(blogId),
        });
        if (blogWithThatComment) {
    
          throw new BadRequestException(
            'The provided id looks like a commentId. To add a reply use POST /addcomment/reply/:commentId. To add a comment provide the blogId (the parent blog _id).',
          );
        }
        throw new NotFoundException(`Blog not found for blogId: ${blogId}`);
      }

      if (!Array.isArray(blog.comments)) blog.comments = [];

      const newComment = {
        _id: new Types.ObjectId(),
        author,
        content,
        createdAt: new Date(),
        replies: [],
      };

      blog.comments.unshift(newComment);

      await blog.save();

      return {
        message: 'Comment added successfully!',
        comment: newComment,
      };
    } catch (error) {
  
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error('Error in create comment:', error);
      throw new InternalServerErrorException('Failed to add comment: ' + (error?.message || error));
    }
  }

  async addReply(commentId: string, author: string, content: string) {
    try {
      if (!commentId || !author || !content) {
        throw new BadRequestException('Missing required fields: commentId, author, or content');
      }

      if (!Types.ObjectId.isValid(commentId)) {
        throw new BadRequestException(`Invalid commentId: ${commentId}`);
      }

      const blog = await this.countingBlogModel.findOne({
        'comments._id': new Types.ObjectId(commentId),
      });

      if (!blog) {
        throw new NotFoundException(`No blog contains commentId: ${commentId}`);
      }

      if (!Array.isArray(blog.comments)) blog.comments = [];

      const commentIndex = blog.comments.findIndex(
        (c: any) => c._id.toString() === commentId.toString(),
      );

      if (commentIndex === -1) {
        throw new NotFoundException(`Comment not found for commentId: ${commentId}`);
      }

      if (!Array.isArray(blog.comments[commentIndex].replies)) {
        blog.comments[commentIndex].replies = [];
      }

      const reply = {
        _id: new Types.ObjectId(),
        author,
        content,
        createdAt: new Date(),
      };

      blog.comments[commentIndex].replies.push(reply);
      blog.markModified('comments');

      await blog.save();
      const updated = await this.countingBlogModel
        .findOne({ 'comments._id': new Types.ObjectId(commentId) })
        .lean();

      if (!updated || !Array.isArray(updated.comments)) {
        throw new NotFoundException('Updated comment not found after saving');
      }

      const updatedComment = updated.comments.find(
        (c: any) => c._id.toString() === commentId.toString(),
      );

      if (!updatedComment) {
        throw new NotFoundException('Updated comment not found');
      }

      return {
        message: 'Reply added successfully!',
        comment: updatedComment,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error(' Error in addReply:', error);
      throw new InternalServerErrorException('Failed to add reply: ' + (error?.message || error));
    }
  }

  async findAll(blogId: string) {
    try {
      if (!blogId) throw new BadRequestException('Missing blogId');
      if (!Types.ObjectId.isValid(blogId)) throw new BadRequestException('Invalid blogId');

      const blog = await this.countingBlogModel.findById(new Types.ObjectId(blogId)).lean();
      if (!blog) throw new NotFoundException('Blog not found');

      return {
        message: 'Comments fetched successfully',
        comments: blog.comments || [],
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error(' Error in findAll:', error);
      throw new InternalServerErrorException('Failed to fetch comments: ' + (error?.message || error));
    }
  }

  async update(dto: UpdateAddcommentDto) {
    try {
      const { blogId, commentId, content } = dto;
      if (!blogId || !commentId || !content) {
        throw new BadRequestException('Missing required fields: blogId, commentId, or content');
      }
      if (!Types.ObjectId.isValid(blogId) || !Types.ObjectId.isValid(commentId)) {
        throw new BadRequestException('Invalid blogId or commentId');
      }
      const blog = await this.countingBlogModel.findById(new Types.ObjectId(blogId));
      if (!blog) throw new NotFoundException('Blog not found');

      if (!Array.isArray(blog.comments)) blog.comments = [];

      const commentIndex = blog.comments.findIndex(
        (c: any) =>c._id.toString() === commentId.toString(),
      );

      if (commentIndex === -1) throw new NotFoundException('Comment not found');

      blog.comments[commentIndex].content = content;
      blog.comments[commentIndex].updatedAt = new Date();

      blog.markModified('comments');
      await blog.save();

      return { message: 'Comment updated successfully!' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error(' Error in update:', error);
      throw new InternalServerErrorException('Failed to update comment: ' + (error?.message || error));
    }
  }
  async remove(blogId: string, commentId: string) {
    try {
      if (!blogId || !commentId) throw new BadRequestException('Missing blogId or commentId');
      if (!Types.ObjectId.isValid(blogId) || !Types.ObjectId.isValid(commentId)) {
        throw new BadRequestException('Invalid blogId or commentId');
      }

      const blog = await this.countingBlogModel.findById(new Types.ObjectId(blogId));
      if (!blog) throw new NotFoundException('Blog not found');

      if (!Array.isArray(blog.comments)) blog.comments = [];

      const prevLength = blog.comments.length;
      blog.comments = blog.comments.filter(
        (c: any) => c._id.toString() !== commentId.toString(),
      );

      if (blog.comments.length === prevLength) throw new NotFoundException('Comment not found');

      blog.markModified('comments');
      await blog.save();

      return { message: 'Comment deleted successfully!' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error(' Error in remove:', error);
      throw new InternalServerErrorException('Failed to delete comment: ' + (error?.message || error));
    }
  }
}
