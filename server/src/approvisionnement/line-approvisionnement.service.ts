
import { Injectable } from '@nestjs/common';
import { UpdateApprovisionnementDto } from './dto/update-approvisionnement.dto';
import { Repository } from 'typeorm';
import { LigneApprovisionnement } from './entities/ligne-approvisionnement.entity';
import { CreateLigneApprovisionnementDto } from './dto/create-ligne-approvisionnement.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LigneApprovisionnementService {

  constructor(
    @InjectRepository(LigneApprovisionnement) private readonly ligneApprovisionnementRepository: Repository<LigneApprovisionnement>
  ) {}

  async create(createLigneApprovisionnementDto: CreateLigneApprovisionnementDto) {

    const newLigneApprovisionnement = await this.ligneApprovisionnementRepository.create(createLigneApprovisionnementDto);
   return this.ligneApprovisionnementRepository.save(newLigneApprovisionnement);

  }


/*  async create(createApprovisionnementDto: CreateApprovisionnementDto) {
    const { produit } = createApprovisionnementDto;
    const product = await this.productService.findOne(produit);
    console.log('product', product);
    
    if (!product) {
      throw new Error('Produit non existant');
    }
    //update product stock
    const newStock =  product.quantite + createApprovisionnementDto.quantite;
    console.log('newStock', newStock);
    
    this.productService.update(produit, {quantite: newStock});
    const newApprovisionnement = await this.ligneApprovisionnementRepository.create(createApprovisionnementDto);
    console.log('newApprovisionnement', newApprovisionnement);
    
   return this.ligneApprovisionnementRepository.save(newApprovisionnement);

  }
 */
  findAll() {
    return this.ligneApprovisionnementRepository.find();
  }

/*   async findByBoutique(idBoutique: number) {
    return this.ligneApprovisionnementRepository.find({where: {boutique: idBoutique}});
  }
 */
  findOne(id: number) {
    return this.ligneApprovisionnementRepository.findOneBy({id});
  }

  update(id: number, updateApprovisionnementDto: UpdateApprovisionnementDto) {
    return this.ligneApprovisionnementRepository.update(id, updateApprovisionnementDto);
  }

  remove(id: number) {
    return this.ligneApprovisionnementRepository.softDelete(id);
  }
}
