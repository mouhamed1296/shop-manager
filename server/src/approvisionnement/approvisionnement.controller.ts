import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApprovisionnementService } from './approvisionnement.service';
import { CreateApprovisionnementDto } from './dto/create-approvisionnement.dto';
import { UpdateApprovisionnementDto } from './dto/update-approvisionnement.dto';

@Controller('approvisionnement')
export class ApprovisionnementController {
  constructor(private readonly approvisionnementService: ApprovisionnementService) {}

  @Post()
  create(@Body() createApprovisionnementDto: CreateApprovisionnementDto) {
    return this.approvisionnementService.create(createApprovisionnementDto);
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
