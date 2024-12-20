import { IsInt, IsDecimal, IsString, IsOptional, IsDate, MaxLength } from 'class-validator';

export class CreateProduitDto {
  @IsString()
  @MaxLength(255)
  libelle: string;

  @IsInt()
  id_categorie: number;

  @IsInt()
  quantite: number;

  @IsDecimal({ decimal_digits: '0,2' })
  prix_achat: number;

  @IsDecimal({ decimal_digits: '0,2' })
  prix_vente: number;

  @IsDate()
  date_reception: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @MaxLength(255)
  code_produit: string;

  @IsInt()
  id_fournisseur: number;

  @IsInt()
  id_boutique: number;

  @IsInt()
  seuil_alerte: number;
}
