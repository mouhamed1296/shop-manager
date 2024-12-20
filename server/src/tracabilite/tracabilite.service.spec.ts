import { Test, TestingModule } from '@nestjs/testing';
import { TracabiliteService } from './tracabilite.service';

describe('TracabiliteService', () => {
  let service: TracabiliteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracabiliteService],
    }).compile();

    service = module.get<TracabiliteService>(TracabiliteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
