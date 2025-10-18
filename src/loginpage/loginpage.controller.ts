import { Controller, Post, Body,Get, UsePipes,Patch, ValidationPipe, BadRequestException, Query, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LoginpageService } from './loginpage.service';
import { CreateLoginpageDto } from './dto/create-loginpage.dto';
import { updateUserdto } from './dto/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('loginpage')
export class LoginpageController {
  constructor(private readonly loginpageService: LoginpageService) {}


  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() registerDto: CreateLoginpageDto) {
    const result = await this.loginpageService.register(registerDto);
    if (result.status === 'fail') throw new BadRequestException(result.message);
    return result;
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signIn(@Body() loginDto: CreateLoginpageDto) {
    const result = await this.loginpageService.signIn(loginDto.email, loginDto.password);
    if (result.status === 'fail') throw new BadRequestException(result.message);
    return result;
  }
  @Patch(':userId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
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
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateLoginpageDto: updateUserdto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      updateLoginpageDto.profilePicture = `http://192.168.0.112:3000/uploads/${image.filename}`;
    }

    const result = await this.loginpageService.update(userId, updateLoginpageDto);
    return { status: true, message: 'Profile updated successfully', result };
  }
@Get(':id')
async getUserById(@Param('id') id: string) {
  console.log('Received ID:', id);
  const result = await this.loginpageService.getUserById(id);
  console.log('Result:', result);
  return result;
}
}
