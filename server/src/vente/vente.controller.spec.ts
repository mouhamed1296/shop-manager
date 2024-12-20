import { Test, TestingModule } from '@nestjs/testing';
import { VenteController } from './vente.controller';
import { VenteService } from './vente.service';

describe('VenteController', () => {
  let controller: VenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenteController],
      providers: [VenteService],
    }).compile();

    controller = module.get<VenteController>(VenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
