import { Test, TestingModule } from '@nestjs/testing';
import { VenteService } from './vente.service';

describe('VenteService', () => {
  let service: VenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenteService],
    }).compile();

    service = module.get<VenteService>(VenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
