import { PartialType } from '@nestjs/mapped-types';
import { CreateTracabiliteDto } from './create-tracabilite.dto';

export class UpdateTracabiliteDto extends PartialType(CreateTracabiliteDto) {}
