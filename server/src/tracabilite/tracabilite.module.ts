import { Module } from '@nestjs/common';
import { TracabiliteService } from './tracabilite.service';
import { TracabiliteController } from './tracabilite.controller';
import { Tracabilite } from './entities/tracabilite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tracabilite])],
  controllers: [TracabiliteController],
  providers: [TracabiliteService]
})
export class TracabiliteModule {}
