import { Test, TestingModule } from '@nestjs/testing';
import { TracabiliteController } from './tracabilite.controller';
import { TracabiliteService } from './tracabilite.service';

describe('TracabiliteController', () => {
  let controller: TracabiliteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracabiliteController],
      providers: [TracabiliteService],
    }).compile();

    controller = module.get<TracabiliteController>(TracabiliteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
