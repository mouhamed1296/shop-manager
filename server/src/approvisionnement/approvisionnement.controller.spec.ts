import { Test, TestingModule } from '@nestjs/testing';
import { ApprovisionnementController } from './approvisionnement.controller';
import { ApprovisionnementService } from './approvisionnement.service';

describe('ApprovisionnementController', () => {
  let controller: ApprovisionnementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovisionnementController],
      providers: [ApprovisionnementService],
    }).compile();

    controller = module.get<ApprovisionnementController>(ApprovisionnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
