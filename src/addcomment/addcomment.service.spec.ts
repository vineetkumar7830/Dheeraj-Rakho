import { Test, TestingModule } from '@nestjs/testing';
import { AddcommentService } from './addcomment.service';

describe('AddcommentService', () => {
  let service: AddcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddcommentService],
    }).compile();

    service = module.get<AddcommentService>(AddcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
