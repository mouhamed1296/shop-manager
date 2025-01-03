import { Module } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueController } from './boutique.controller';
import { Boutique } from './entities/boutique.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Boutique])],
  controllers: [BoutiqueController],
  providers: [BoutiqueService]
})
export class BoutiqueModule {}
