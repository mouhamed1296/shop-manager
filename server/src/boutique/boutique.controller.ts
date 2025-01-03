import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post()
 async create(@Body() createBoutiqueDto: CreateBoutiqueDto) {
    return await this.boutiqueService.create(createBoutiqueDto);
  }

  @Get()
  findAll() {
    return this.boutiqueService.findAll();
  }

 @Get('by-proprietaire/:id')
  async findByProprietaire(@Param('id') id: User) {
    return this.boutiqueService.findByProprietaire(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boutiqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoutiqueDto: UpdateBoutiqueDto) {
    return this.boutiqueService.update(+id, updateBoutiqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boutiqueService.remove(+id);
  }
}
