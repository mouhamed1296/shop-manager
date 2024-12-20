import { Test, TestingModule } from '@nestjs/testing';
import { BoutiqueService } from './boutique.service';

describe('BoutiqueService', () => {
  let service: BoutiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoutiqueService],
    }).compile();

    service = module.get<BoutiqueService>(BoutiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
