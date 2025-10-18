import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Dashboard } from './entities/dashboard.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(@InjectModel(Dashboard.name) private dashboardModel: Model<Dashboard>) {}

  async create(createDto: CreateDashboardDto) {
    try {
      if (createDto.slug && createDto.slug.trim() !== '') {
        const existing = await this.dashboardModel.findOne({ slug: createDto.slug });
        if (existing) createDto.slug += '-' + Date.now();
      } else {
        createDto.slug = createDto.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      }

      const newDashboard = new this.dashboardModel(createDto);
      return await newDashboard.save();
    } catch (error) {
      if (error.code === 11000) throw new ConflictException('Slug already exists');
      throw new InternalServerErrorException('Failed to create dashboard: ' + error.message);
    }
  }

  async findAll() {
    return await this.dashboardModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid Dashboard ID');
    const dashboard = await this.dashboardModel.findById(id);
    if (!dashboard) throw new NotFoundException('Dashboard not found');
    return dashboard;
  }

  async update(id: string, updateDto: UpdateDashboardDto) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid Dashboard ID');

    if (updateDto.slug && updateDto.slug.trim() !== '') {
      const existing = await this.dashboardModel.findOne({ slug: updateDto.slug, _id: { $ne: id } });
      if (existing) updateDto.slug += '-' + Date.now();
    } else if (!updateDto.slug && updateDto.title) {
      updateDto.slug = updateDto.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    }

    const updated = await this.dashboardModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updated) throw new NotFoundException('Dashboard not found');
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid Dashboard ID');
    const deleted = await this.dashboardModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Dashboard not found');
    return deleted;
  }

  async getAllUsers() {
    const dashboards = await this.dashboardModel.find();
    
    const usersSet = new Set<string>();
    const authorsSet = new Set<string>();

    dashboards.forEach(d => {
      if (d.user) usersSet.add(d.user);
      if (d.author) authorsSet.add(d.author);
    });

    return {
      status: 'success',
      message: 'All users and authors fetched successfully',
      totalUsers: usersSet.size,
      users: Array.from(usersSet),
      totalAuthors: authorsSet.size,
      authors: Array.from(authorsSet),
    };
  }
}
