import { Test, TestingModule } from '@nestjs/testing';
import {DashboardcreateController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardcreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardcreateController],
      providers: [DashboardService],
    }).compile();

    controller = module.get<DashboardcreateController>(DashboardcreateController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
