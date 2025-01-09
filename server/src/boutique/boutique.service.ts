import { Injectable } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boutique } from './entities/boutique.entity';

@Injectable()
export class BoutiqueService {
  constructor(
    @InjectRepository(Boutique) private readonly boutiqueRepository: Repository<Boutique>,
  ) {

  }
 async create(createBoutiqueDto: CreateBoutiqueDto) {
    const boutiqueExists = await this.boutiqueRepository.findOne({
      where: { libelle: createBoutiqueDto.libelle, id_proprietaire : createBoutiqueDto.proprietaire },
    });
    console.log('boutiqueExists', boutiqueExists);
    
    if (boutiqueExists) {
      throw new Error('Boutique déjà existante');
    }

    const boutique = this.boutiqueRepository.create(createBoutiqueDto);
    return this.boutiqueRepository.save(boutique);
  }

  findAll() {
    return `This action returns all boutique`;
  }
  async findByProprietaire(idProprietaire: number) {
    return this.boutiqueRepository.find({where: {id_proprietaire: idProprietaire}});
  }

  findOne(id: number) {
return this.boutiqueRepository.findOneBy({id});
  }

  update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    const boutiqueExists = this.boutiqueRepository.findOneBy({id});
    if (!boutiqueExists) {
      throw new Error('Boutique non existante');
    }
    const checkIfBoutiqueNameExists = this.boutiqueRepository.findOneBy({libelle: updateBoutiqueDto.libelle, id_proprietaire : updateBoutiqueDto.proprietaire});  
    if (checkIfBoutiqueNameExists) {
      throw new Error('Boutique déjà existante');
    }
    return this.boutiqueRepository.update(id, updateBoutiqueDto);
  }

  remove(id: number) {
    const boutiqueExists = this.boutiqueRepository.findOneBy({id});
    if (!boutiqueExists) {
      throw new Error('Boutique non existante');
    }
    return this.boutiqueRepository.softDelete(id);
   
  }
}
