import { Module } from '@nestjs/common';
import { ApprovisionnementService } from './approvisionnement.service';
import { ApprovisionnementController } from './approvisionnement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approvisionnement } from './entities/approvisionnement.entity';
import { ProductService } from 'src/product/product.service';
import { ApprovisionnementRepository } from './approvisionnement.repository';
import { ProductsRepository } from 'src/product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Approvisionnement])],
  controllers: [ApprovisionnementController],
  providers: [ApprovisionnementService, ProductService, ApprovisionnementRepository, ProductsRepository]
})
export class ApprovisionnementModule {}
