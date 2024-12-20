import { Test, TestingModule } from '@nestjs/testing';
import { FournisseurService } from './fournisseur.service';

describe('FournisseurService', () => {
  let service: FournisseurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FournisseurService],
    }).compile();

    service = module.get<FournisseurService>(FournisseurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
