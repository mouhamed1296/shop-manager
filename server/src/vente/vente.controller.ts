import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenteService } from './vente.service';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';

@Controller('vente')
export class VenteController {
  constructor(private readonly venteService: VenteService) {}

  @Post()
  create(@Body() createVenteDto: CreateVenteDto) {
    return this.venteService.create(createVenteDto);
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
