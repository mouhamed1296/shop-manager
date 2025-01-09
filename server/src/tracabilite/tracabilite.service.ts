import { Injectable } from '@nestjs/common';
import { CreateTracabiliteDto } from './dto/create-tracabilite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Tracabilite } from './entities/tracabilite.entity';
import { Between } from 'typeorm';

@Injectable()
export class TracabiliteService {
  constructor(
    @InjectRepository(Tracabilite) private readonly tracabiliteRepository: Repository<Tracabilite>,
  ) {}
  create(createTracabiliteDto: CreateTracabiliteDto) {
    const tracabilite = this.tracabiliteRepository.create(createTracabiliteDto);
    return this.tracabiliteRepository.save(tracabilite);
  }

  findAll() {
    return this.tracabiliteRepository.find();
  }

  async findByPeriod(dateDebut: Date, dateFin: Date) {
    return this.tracabiliteRepository.find({where: { date_action: Between(dateDebut, dateFin),}});
  }

  findOneByUser(id: number) {
    return this.tracabiliteRepository.find({where: { id_user: id}});
  }

}
