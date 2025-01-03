import { Injectable } from '@nestjs/common';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Vente } from './entities/vente.entity';

@Injectable()
export class VenteService {
  constructor(@InjectRepository (Vente) private readonly venteRepository: Repository<Vente>,
  ) {}
  
   async create(createVenteDto: CreateVenteDto): Promise<Vente> {
    // const vente = createVenteDto without product
    const ventes = { quantite: createVenteDto.quantite,
        montant_total: createVenteDto.montant_total, 
        boutique: createVenteDto.boutique,
         user: createVenteDto.user,
         statut: createVenteDto.statut,
   };
   

console.log('createVenteDto', createVenteDto);

    const vente = this.venteRepository.create(ventes);
    console.log('vente', vente);
    
    return await this.venteRepository.save(vente);
  }

  async findAll(): Promise<Vente[]> {
    return await this.venteRepository.find({ relations: ['ligneVentes', 'boutique', 'user'] });
  }
  async findByBoutique(idBoutique: number): Promise<Vente[]> {
    return await this.venteRepository.find({where: {boutique: idBoutique}, relations: ['ligneVentes', 'boutique', 'user']});
  }

  async findOne(id: number): Promise<Vente> {
    const vente = await this.venteRepository.findOne({
      where: { id },
      relations: ['ligneVentes', 'boutique', 'user'],
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
  }
}

