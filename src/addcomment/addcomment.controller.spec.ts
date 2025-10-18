import { Test, TestingModule } from '@nestjs/testing';
import { AddcommentController } from './addcomment.controller';
import { AddcommentService } from './addcomment.service';

describe('AddcommentController', () => {
  let controller: AddcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddcommentController],
      providers: [AddcommentService],
    }).compile();

    controller = module.get<AddcommentController>(AddcommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
