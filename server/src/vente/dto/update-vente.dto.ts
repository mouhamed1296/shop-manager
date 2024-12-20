import { PartialType } from '@nestjs/mapped-types';
import { CreateVenteDto } from './create-vente.dto';

export class UpdateVenteDto extends PartialType(CreateVenteDto) {}
