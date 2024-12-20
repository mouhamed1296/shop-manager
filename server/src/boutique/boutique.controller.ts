import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post()
  create(@Body() createBoutiqueDto: CreateBoutiqueDto) {
    return this.boutiqueService.create(createBoutiqueDto);
  }

  @Get()
  findAll() {
    return this.boutiqueService.findAll();
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
