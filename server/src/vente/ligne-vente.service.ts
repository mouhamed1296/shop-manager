import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { LigneVente } from './entities/ligne-vente.entity';
import { CreateLigneVenteDto } from './dto/create-ligne-vente.dto';

@Injectable()
export class LigneVenteService {
  constructor(@InjectRepository (LigneVente) private readonly ligneVenteRepository: Repository<LigneVente>,
  ) {}
  
   async create(createLigneVenteDto: CreateLigneVenteDto){
    const ligneVente = await this.ligneVenteRepository.create(createLigneVenteDto);
    return await this.ligneVenteRepository.save(ligneVente);
  }

 /*  async findAll(): Promise<Vente[]> {
    return await this.vligneVenteRepository.find({ relations: ['ligneVentes', 'id_boutique', 'id_user'] });
  }
  async findByBoutique(idBoutique: number): Promise<Vente[]> {
    return await this.vligneVenteRepository.find({where: {boutique: idBoutique}, relations: ['ligneVentes', 'id_boutique', 'id_user']});
  }

  async findOne(id: number): Promise<Vente> {
    const vente = await this.venteRepository.findOne({
      where: { id },
      relations: ['ligneVentes', 'id_boutique', 'id_user'],
    });
    if (!vente) {
      throw new Error('Vente non existante');
    }
    return vente;
  }

  async update(id: number, updateVenteDto: UpdateVenteDto): Promise<Vente> {
    const vente = await this.findOne(id);
    Object.assign(vente, updateVenteDto);
    return await this.venteRepository.save(vente);
  }

  async remove(id: number): Promise<void> {
    const vente = await this.findOne(id);
    await this.venteRepository.remove(vente); 
  }*/
}

