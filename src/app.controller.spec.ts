import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Updateprofile } from './entities/updateprofile.entity';
import { UpdateProfileDto } from './dto/update-updateprofile.dto';

@Injectable()
export class UpdateprofileService {
  constructor(
    @InjectModel(Updateprofile.name)
    private readonly updateprofileModel: Model<Updateprofile>,
  ) {}

  private toDate(value?: string | Date): Date | undefined {
    if (!value) return undefined;
    const d = value instanceof Date ? value : new Date(String(value));
    return isNaN(d.getTime()) ? undefined : d;
  }

  // 🟢 Create/Update single (first) profile
  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const existing = await this.updateprofileModel.findOne();

    const payload: any = {
      ...updateProfileDto,
      lastLogin: this.toDate(updateProfileDto.lastLogin),
      accountCreated: this.toDate(updateProfileDto.accountCreated),
    };

    let result;
    if (existing) {
      result = await this.updateprofileModel.findByIdAndUpdate(
        existing._id,
        payload,
        { new: true, runValidators: true },
      );
    } else {
      const created = new this.updateprofileModel(payload);
      result = await created.save();
    }

    return {
      status: 'success',
      message: existing
        ? 'Profile updated successfully!'
        : 'Profile created successfully!',
      result,
    };
  }

  // 🟢 Get all profiles (full details)
  async getAllProfiles() {
    const profiles = await this.updateprofileModel.find(); // <- all documents
    return {
      status: 'success',
      message: profiles.length
        ? 'Profiles fetched successfully!'
        : 'No profiles found',
      count: profiles.length,
      result: profiles,
    };
  }

  // 🟢 Get single profile by ID
  async getProfileById(id: string) {
    const profile = await this.updateprofileModel.findById(id);
    if (!profile) throw new NotFoundException('Profile not found');
    return {
      status: 'success',
      message: 'Profile fetched successfully!',
      result: profile,
    };
  }
}
