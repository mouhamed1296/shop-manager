import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TracabiliteService } from './tracabilite.service';
import { CreateTracabiliteDto } from './dto/create-tracabilite.dto';
import { UpdateTracabiliteDto } from './dto/update-tracabilite.dto';

@Controller('tracabilite')
export class TracabiliteController {
  constructor(private readonly tracabiliteService: TracabiliteService) {}

  @Post()
  create(@Body() createTracabiliteDto: CreateTracabiliteDto) {
    return this.tracabiliteService.create(createTracabiliteDto);
  }

  @Get()
  findAll() {
    return this.tracabiliteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracabiliteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTracabiliteDto: UpdateTracabiliteDto) {
    return this.tracabiliteService.update(+id, updateTracabiliteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracabiliteService.remove(+id);
  }
}
