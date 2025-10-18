import { Test, TestingModule } from '@nestjs/testing';
import { CountingblogService } from './countingblog.service';

describe('CountingblogService', () => {
  let service: CountingblogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountingblogService],
    }).compile();

    service = module.get<CountingblogService>(CountingblogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
