import { PartialType } from '@nestjs/mapped-types';
import { CreateApprovisionnementDto } from './create-approvisionnement.dto';

export class UpdateApprovisionnementDto extends PartialType(CreateApprovisionnementDto) {}
