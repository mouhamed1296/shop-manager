
import { ProductService } from 'src/product/product.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { VenteService } from './vente.service';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { LigneVenteService } from './ligne-vente.service';
import { TransactionInterceptor } from 'src/shared/repository/transaction.interceptor';
import { Not } from 'typeorm';

@Controller('vente')
export class VenteController {
  constructor(private readonly venteService: VenteService,
    private readonly productService: ProductService,
    private readonly ligneVenteService: LigneVenteService
  ) {}

  @UseInterceptors(TransactionInterceptor)
  @Post()
  async create(@Body() createVenteDto: CreateVenteDto) {

    for (const p of createVenteDto.produit) {
      const produit = await this.productService.findOne(p.produit);
if (!produit) {
        throw new NotFoundException('Produit non existant');
      }
      if (produit.quantite < p.quantite) {
        throw new Error('Quantité insuffisante');
      }
  
      const newQuantite = produit.quantite - p.quantite;
      await this.productService.update(produit.id, { quantite: newQuantite });
    }
  
    const vente = await this.venteService.create(createVenteDto);

    const ligneVentes = await Promise.all(
      createVenteDto.produit.map(async (p) => {
        return await this.ligneVenteService.create({
          vente:123,
          produit: p.produit,
          quantite: p.quantite,
          prix_unitaire: p.prix_unitaire,
          montant_total: p.quantite * p.prix_unitaire,
        });
      })
    );
  
    return { vente, ligneVentes };
  }
  


  @Get()
  findAll() {
    return this.venteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenteDto: UpdateVenteDto) {
    return this.venteService.update(+id, updateVenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venteService.remove(+id);
  }
}
