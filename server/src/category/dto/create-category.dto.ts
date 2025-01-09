import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  nom: string;

  boutique: number;
}