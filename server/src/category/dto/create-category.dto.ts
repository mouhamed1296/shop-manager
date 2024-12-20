import { IsString, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  nom: string;

  @IsInt()
  id_proprietaire: number;
}