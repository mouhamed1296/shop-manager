import { Test, TestingModule } from '@nestjs/testing';
import { BoutiqueController } from './boutique.controller';
import { BoutiqueService } from './boutique.service';

describe('BoutiqueController', () => {
  let controller: BoutiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoutiqueController],
      providers: [BoutiqueService],
    }).compile();

    controller = module.get<BoutiqueController>(BoutiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
