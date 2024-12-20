import { Injectable } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';

@Injectable()
export class BoutiqueService {
  create(createBoutiqueDto: CreateBoutiqueDto) {
    return 'This action adds a new boutique';
  }

  findAll() {
    return `This action returns all boutique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boutique`;
  }

  update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    return `This action updates a #${id} boutique`;
  }

  remove(id: number) {
    return `This action removes a #${id} boutique`;
  }
}
