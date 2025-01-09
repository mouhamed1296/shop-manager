import { LigneApprovisionnementService } from './line-approvisionnement.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApprovisionnementService } from './approvisionnement.service';
import { CreateApprovisionnementDto } from './dto/create-approvisionnement.dto';
import { UpdateApprovisionnementDto } from './dto/update-approvisionnement.dto';
import { ProductService } from 'src/product/product.service';

@Controller('approvisionnement')
export class ApprovisionnementController {
  constructor(private readonly approvisionnementService: ApprovisionnementService,
    private readonly productService: ProductService,
    private readonly ligneApprovisionnementService: LigneApprovisionnementService
  ) {}

  @Post()
  async create(@Body() createApprovisionnementDto: CreateApprovisionnementDto) {
    const { produit } = createApprovisionnementDto;
    const product = await this.productService.findOne(produit);
    console.log('product', product);
    console.log('createApprovisionnementDto', createApprovisionnementDto);
    
    if (!product) {
      throw new Error('Produit non existant');
    }
    //update product stock
    const newStock =  product.quantite + createApprovisionnementDto.quantite;
    console.log('newStock', newStock);
    
    this.productService.update(produit, {quantite: newStock});
    const approvisionnement = await this.approvisionnementService.create(createApprovisionnementDto);

    return this.ligneApprovisionnementService.create({
      approvisionnement: approvisionnement.id,
      produit: createApprovisionnementDto.produit,
      quantite: createApprovisionnementDto.quantite,
      prix_unitaire: createApprovisionnementDto.prix_unitaire,
      montant_total: approvisionnement.montant_total

    });

  }

  @Get()
  findAll() {
    return this.approvisionnementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.approvisionnementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApprovisionnementDto: UpdateApprovisionnementDto) {
    return this.approvisionnementService.update(+id, updateApprovisionnementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.approvisionnementService.remove(+id);
  }
}
