import { Injectable } from '@nestjs/common';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fournisseur } from './entities/fournisseur.entity';

@Injectable()
export class FournisseurService {
  constructor( @InjectRepository(Fournisseur) private readonly fournisseurRepository: Repository<Fournisseur>,) {
   
  }
  async create(createFournisseurDto: CreateFournisseurDto) {
   const existingFournisseur = await this.fournisseurRepository.findOne({
      where: { nom: createFournisseurDto.nom,id_boutique : createFournisseurDto.boutique },
    });

    if (existingFournisseur) {
      throw new Error('Fournisseur déjà existant');
    }

    const fournisseur = this.fournisseurRepository.create(createFournisseurDto);

    return this.fournisseurRepository.save(fournisseur);
  }

  async findByBoutique(idBoutique: number) {
    return this.fournisseurRepository.find({where: {id_boutique: idBoutique}});
  }

  findAll() {
    return this.fournisseurRepository.find();
  }

  findOne(id: number) {
    return this.fournisseurRepository.findOneBy({id});
  }

  update(id: number, updateFournisseurDto: UpdateFournisseurDto) {
    const existingFournisseur = this.fournisseurRepository.findOneBy({id});
    if (!existingFournisseur) {
      throw new Error('Fournisseur non existant');
    }

    const checkIfFournisseurNameExists = this.fournisseurRepository.findOneBy({nom: updateFournisseurDto.nom, id_boutique : updateFournisseurDto.boutique});
    if (checkIfFournisseurNameExists) {
      throw new Error('Fournisseur déjà existant');
    }

    return this.fournisseurRepository.update(id, updateFournisseurDto);
  }

  remove(id: number) {
    return this.fournisseurRepository.softDelete(id);
  }
}
