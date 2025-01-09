import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TracabiliteService } from './tracabilite.service';
import { CreateTracabiliteDto } from './dto/create-tracabilite.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('tracabilite')
export class TracabiliteController {
  constructor(private readonly tracabiliteService: TracabiliteService) {}

  @Post()
  create(@Body() createTracabiliteDto: CreateTracabiliteDto) {
    return this.tracabiliteService.create(createTracabiliteDto);
  }

@Get('by-period/:dateDebut/:dateFin')
  async findByPeriod(@Param('dateDebut') dateDebut: string, @Param('dateFin') dateFin: string) {
    return this.tracabiliteService.findByPeriod(new Date(dateDebut), new Date(dateFin));
  }

  @Get()
  findAll() {
    return this.tracabiliteService.findAll();
  }

  @Get('by-user/:id')
  findOneByUser(@Param('id') id: User) {
    return this.tracabiliteService.findOneByUser(+id);
  }


}
