import { Module } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueController } from './boutique.controller';

@Module({
  controllers: [BoutiqueController],
  providers: [BoutiqueService]
})
export class BoutiqueModule {}
