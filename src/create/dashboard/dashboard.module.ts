import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardcreateController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Dashboard, DashboardSchema } from './entities/dashboard.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dashboard.name, schema: DashboardSchema }])],
  controllers: [DashboardcreateController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
