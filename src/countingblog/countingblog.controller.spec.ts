import { Test, TestingModule } from '@nestjs/testing';
import { CountingBlog } from './entities/countingblog.entity';
import { CountingblogService } from './countingblog.service';

describe('CountingblogController', () => {
  let controller: CountingBlog;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountingBlog],
      providers: [CountingblogService],
    }).compile();

    controller = module.get<CountingBlog>(CountingBlog);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
