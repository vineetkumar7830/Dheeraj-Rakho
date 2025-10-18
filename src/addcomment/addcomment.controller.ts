import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AddcommentService } from './addcomment.service';
import { CreateAddcommentDto } from './dto/create-addcomment.dto';
import { UpdateAddcommentDto } from './dto/update-addcomment.dto';

@Controller('addcomment')
export class AddcommentController {
  constructor(private readonly addcommentService: AddcommentService) {}

  // 🟢 Add a new comment to a blog
  @Post()
  async create(@Body() dto: CreateAddcommentDto) {
    if (!dto.blogId || !dto.author || !dto.content) {
      throw new NotFoundException(
        'Missing required fields: blogId, author, or content',
      );
    }
    return this.addcommentService.create(dto);
  }

  // 🟢 Add reply using only commentId
  @Post('reply/:commentId')
  async addReply(
    @Param('commentId') commentId: string,
    @Body('author') author: string,
    @Body('content') content: string,
  ) {
    if (!author || !content) {
      throw new NotFoundException('Missing required fields: author or content');
    }
    return this.addcommentService.addReply(commentId, author, content);
  }

  // 🟢 Get all comments (with replies) of a blog
  @Get(':blogId')
  async findAll(@Param('blogId') blogId: string) {
    return this.addcommentService.findAll(blogId);
  }

  // 🟡 Update a comment
  @Patch()
  async update(@Body() dto: UpdateAddcommentDto) {
    if (!dto.blogId || !dto.commentId || !dto.content) {
      throw new NotFoundException(
        'Missing required fields: blogId, commentId, or content',
      );
    }
    return this.addcommentService.update(dto);
  }

  // 🔴 Delete a comment
  @Delete(':blogId/:commentId')
  async remove(
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
  ) {
    if (!blogId || !commentId) {
      throw new NotFoundException('Missing required fields: blogId or commentId');
    }
    return this.addcommentService.remove(blogId, commentId);
  }
}
