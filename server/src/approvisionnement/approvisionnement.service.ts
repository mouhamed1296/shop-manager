import { Injectable } from '@nestjs/common';
import { CreateApprovisionnementDto } from './dto/create-approvisionnement.dto';
import { UpdateApprovisionnementDto } from './dto/update-approvisionnement.dto';
import { ApprovisionnementRepository } from './approvisionnement.repository';

@Injectable()
export class ApprovisionnementService {

  constructor(
  
    private readonly approvisionnementRepository: ApprovisionnementRepository
  ) {}

  async create(createApprovisionnementDto: CreateApprovisionnementDto) {
  
    const newApprovisionnement = await this.approvisionnementRepository.create(createApprovisionnementDto);
    console.log('newApprovisionnement', newApprovisionnement);
    
   return this.approvisionnementRepository.save(newApprovisionnement);

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
    const newApprovisionnement = await this.approvisionnementRepository.create(createApprovisionnementDto);
    console.log('newApprovisionnement', newApprovisionnement);
    
   return this.approvisionnementRepository.save(newApprovisionnement);

  }
 */
  findAll() {
    return this.approvisionnementRepository.findAll();
  }

  async findByBoutique(idBoutique: number) {
    return this.approvisionnementRepository.find(idBoutique);
  }

  findOne(id: number) {
    return this.approvisionnementRepository.findOne(id);
  }

  update(id: number, updateApprovisionnementDto: UpdateApprovisionnementDto) {
    return this.approvisionnementRepository.update(id, updateApprovisionnementDto);
  }

  remove(id: number) {
    return this.approvisionnementRepository.remove(id);
  }
}
