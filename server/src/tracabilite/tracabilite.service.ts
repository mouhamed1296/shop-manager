import { Injectable } from '@nestjs/common';
import { CreateTracabiliteDto } from './dto/create-tracabilite.dto';
import { UpdateTracabiliteDto } from './dto/update-tracabilite.dto';

@Injectable()
export class TracabiliteService {
  create(createTracabiliteDto: CreateTracabiliteDto) {
    return 'This action adds a new tracabilite';
  }

  findAll() {
    return `This action returns all tracabilite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tracabilite`;
  }

  update(id: number, updateTracabiliteDto: UpdateTracabiliteDto) {
    return `This action updates a #${id} tracabilite`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracabilite`;
  }
}
