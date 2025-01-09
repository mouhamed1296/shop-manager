import { LigneApprovisionnementService } from './line-approvisionnement.service';
import { Module } from '@nestjs/common';
import { ApprovisionnementService } from './approvisionnement.service';
import { ApprovisionnementController } from './approvisionnement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approvisionnement } from './entities/approvisionnement.entity';
import { ProductService } from 'src/product/product.service';
import { ApprovisionnementRepository } from './approvisionnement.repository';
import { ProductsRepository } from 'src/product/product.repository';
import { LigneApprovisionnement } from './entities/ligne-approvisionnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Approvisionnement, LigneApprovisionnement])],
  controllers: [ApprovisionnementController],
  providers: [ApprovisionnementService, ProductService, ApprovisionnementRepository, ProductsRepository, LigneApprovisionnementService]
})
export class ApprovisionnementModule {}
