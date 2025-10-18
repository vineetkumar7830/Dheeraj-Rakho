import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginpageService } from './loginpage.service';
import { LoginpageController } from './loginpage.controller';
import { Admin, AdminSchema } from './entities/loginpage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [LoginpageController],
  providers: [LoginpageService],
})
export class LoginpageModule {}
