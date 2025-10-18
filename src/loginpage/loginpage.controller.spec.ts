import { Test, TestingModule } from '@nestjs/testing';
import { LoginpageController } from './loginpage.controller';
import { LoginpageService } from './loginpage.service';

describe('LoginpageController', () => {
  let controller: LoginpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginpageController],
      providers: [LoginpageService],
    }).compile();

    controller = module.get<LoginpageController>(LoginpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
