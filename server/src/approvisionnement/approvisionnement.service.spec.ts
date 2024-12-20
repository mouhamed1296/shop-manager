import { Test, TestingModule } from '@nestjs/testing';
import { ApprovisionnementService } from './approvisionnement.service';

describe('ApprovisionnementService', () => {
  let service: ApprovisionnementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovisionnementService],
    }).compile();

    service = module.get<ApprovisionnementService>(ApprovisionnementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
