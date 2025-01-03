import { Module } from '@nestjs/common';
import { VenteService } from './vente.service';
import { VenteController } from './vente.controller';
import { Vente } from './entities/vente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigneVente } from './entities/ligne-vente.entity';
import { LigneVenteService } from './ligne-vente.service';
import { ProductService } from 'src/product/product.service';
import { ProductsRepository } from 'src/product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Vente, LigneVente])],
  controllers: [VenteController],
  providers: [VenteService, LigneVenteService, ProductService, ProductsRepository],
})
export class VenteModule {}
