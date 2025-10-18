import { Test, TestingModule } from '@nestjs/testing';
import { LoginpageService } from './loginpage.service';

describe('LoginpageService', () => {
  let service: LoginpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginpageService],
    }).compile();

    service = module.get<LoginpageService>(LoginpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
