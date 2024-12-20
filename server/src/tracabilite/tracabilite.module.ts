import { Module } from '@nestjs/common';
import { TracabiliteService } from './tracabilite.service';
import { TracabiliteController } from './tracabilite.controller';

@Module({
  controllers: [TracabiliteController],
  providers: [TracabiliteService]
})
export class TracabiliteModule {}
