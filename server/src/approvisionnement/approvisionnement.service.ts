import { Injectable } from '@nestjs/common';
import { CreateApprovisionnementDto } from './dto/create-approvisionnement.dto';
import { UpdateApprovisionnementDto } from './dto/update-approvisionnement.dto';
import { ProductService } from 'src/product/product.service';
import { ApprovisionnementRepository } from './approvisionnement.repository';

@Injectable()
export class ApprovisionnementService {

  constructor(
    private readonly productService: ProductService,
    private readonly approvisionnementRepository: ApprovisionnementRepository
  ) {}

  create(createApprovisionnementDto: CreateApprovisionnementDto) {
    const { id_produit } = createApprovisionnementDto;
    //get the product
    const produit = this.productService.findOne(id_produit);

    //check if the product exist
    if (!produit) {
      return { message: 'Product not found' };
    }


    return this.approvisionnementRepository.create(createApprovisionnementDto);
  }

  findAll() {
    return `This action returns all approvisionnement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} approvisionnement`;
  }

  update(id: number, updateApprovisionnementDto: UpdateApprovisionnementDto) {
    return `This action updates a #${id} approvisionnement`;
  }

  remove(id: number) {
    return `This action removes a #${id} approvisionnement`;
  }
}
