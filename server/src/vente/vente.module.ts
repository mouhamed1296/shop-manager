import { Module } from '@nestjs/common';
import { VenteService } from './vente.service';
import { VenteController } from './vente.controller';

@Module({
  controllers: [VenteController],
  providers: [VenteService]
})
export class VenteModule {}
