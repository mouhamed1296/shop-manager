import { PartialType } from '@nestjs/mapped-types';
import { CreateBoutiqueDto } from './create-boutique.dto';

export class UpdateBoutiqueDto extends PartialType(CreateBoutiqueDto) {}
