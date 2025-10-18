import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './entities/loginpage.entity';
import * as bcrypt from 'bcrypt';
import { CreateLoginpageDto } from './dto/create-loginpage.dto';
import { updateUserdto } from './dto/update-user-profile.dto';
import { throwError } from 'rxjs';

@Injectable()
export class LoginpageService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  // Admin sign-in
  async signIn(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email }).exec();
    if (!admin) {
      return { status: 'fail', message: 'Invalid email or password', result: null };
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return { status: 'fail', message: 'Invalid email or password', result: null };
    }

    return {
      status: 'success',
      message: 'Admin logged in successfully',
      result: { email: admin.email, id: admin._id },
    };
  }

  // Admin register
  async register(createDto: CreateLoginpageDto) {
    const { email, password } = createDto;

    const existingAdmin = await this.adminModel.findOne({ email }).exec();
    if (existingAdmin) {
      return { status: 'fail', message: 'Email already exists', result: null };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await this.adminModel.create({ email, password: hashedPassword });

    return {
      status: 'success',
      message: 'Admin registered successfully',
      result: { email: newAdmin.email, id: newAdmin._id },
    };
  }

  async getUserById(id:string)
  {
    try {

      const user = await this.adminModel.findById(id).lean();
      console.log('user',user)
      if(!user) 
      {
      return { status: 'fail', message: 'User Id not Exits', result: user };
      }
      const user1 = await this.adminModel.findById(id).lean();
      return {
      status: 'success',
      message: 'Admin registered successfully',
      result: user1,
    };
      
    } catch (error) {
    throwError(error);
      
    }
  }

    async update(userId: string, updateLoginpageDto: updateUserdto) {
         console.log(userId)
      const updated = await this.adminModel.findOneAndUpdate({  _id:userId } , updateLoginpageDto, { new: true });
      console.log(updated)
      if (!updated)
        return {
          status: false,
          message: 'Profile not found',
          result: null,
        };
  
      return {
        status: true,
        message: 'Profile updated successfully',
        result: updated,
      };
    }
}
