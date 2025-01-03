import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { Fournisseur } from './entities/fournisseur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([Fournisseur])],
  controllers: [FournisseurController],
  providers: [FournisseurService]
})
export class FournisseurModule {}
