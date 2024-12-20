import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';

@Module({
  controllers: [FournisseurController],
  providers: [FournisseurService]
})
export class FournisseurModule {}
