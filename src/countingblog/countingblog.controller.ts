import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { CountingblogService } from './countingblog.service';
import { CreateCountingblogDto } from './dto/create-countingblog.dto';
import { UpdateCountingblogDto } from './dto/update-countingblog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('countingblog')
export class CountingblogController {
  constructor(private readonly blogService: CountingblogService) {}

 @Post()
  @UseInterceptors(
    FileInterceptor('featured_image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createBlog(
    @UploadedFile() featured_image: Express.Multer.File,
    @Body() createDto: CreateCountingblogDto,
  ) {
    if (featured_image) {
      createDto.featured_image = `${process.env.SERVER_BASE_URL}/uploads/${featured_image.filename}`;
    }
    return this.blogService.create(createDto);
  }

  @Patch(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateDto: UpdateCountingblogDto,
  ) {
    return this.blogService.update(id, updateDto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.delete(id);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.findAll();
  }
  @Get('filter/today-yesterday')
  async getTodayAndYesterdayBlogs() {
    return this.blogService.getTodayAndYesterdayBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }
}
