import { Injectable } from '@nestjs/common';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';

@Injectable()
export class VenteService {
  create(createVenteDto: CreateVenteDto) {
    return 'This action adds a new vente';
  }

  findAll() {
    return `This action returns all vente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vente`;
  }

  update(id: number, updateVenteDto: UpdateVenteDto) {
    return `This action updates a #${id} vente`;
  }

  remove(id: number) {
    return `This action removes a #${id} vente`;
  }
}
