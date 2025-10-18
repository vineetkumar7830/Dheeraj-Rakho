import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboardcreate')
export class DashboardcreateController {
  constructor(private readonly dashboardService: DashboardService) {}

  // ✅ Create dashboard with featured_image support
  @Post()
  @UseInterceptors(
    FileInterceptor('featured_image', {
      storage: diskStorage({
        destination: './uploads/dashboard',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createDto: CreateDashboardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const featuredImagePath = file ? `/uploads/dashboard/${file.filename}` : createDto.featured_image;

    const data = await this.dashboardService.create({
      ...createDto,
      featured_image: featuredImagePath,
    });

    return { status: true, message: 'Dashboard created successfully', result: data };
  }

  // ✅ Update dashboard with featured_image support
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('featured_image', {
      storage: diskStorage({
        destination: './uploads/dashboard',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDashboardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const featuredImagePath = file ? `/uploads/dashboard/${file.filename}` : updateDto.featured_image;

    const data = await this.dashboardService.update(id, {
      ...updateDto,
      ...(featuredImagePath && { featured_image: featuredImagePath }),
    });

    return { status: true, message: 'Dashboard updated successfully', result: data };
  }

  // ✅ Get all dashboards
  @Get()
  async findAll() {
    const data = await this.dashboardService.findAll();
    return { status: true, message: 'Dashboard list fetched successfully', result: data };
  }

  @Get('all-users')
  async getAllUsers() {
    return await this.dashboardService.getAllUsers();
  }

  // ✅ Get single dashboard by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.dashboardService.findOne(id);
    return { status: true, message: 'Dashboard fetched successfully', result: data };
  }

  // ✅ Delete dashboard by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.dashboardService.remove(id);
    return { status: true, message: 'Dashboard deleted successfully', result: data };
  }
}
