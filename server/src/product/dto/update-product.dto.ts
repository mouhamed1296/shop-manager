import { IsOptional, IsString, MaxLength, IsInt, IsDecimal, IsDate } from "class-validator";

export class UpdateProduitDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    libelle?: string;
  
    @IsOptional()
    @IsInt()
    id_categorie?: number;
  
    @IsOptional()
    @IsInt()
    quantite?: number;
  
    @IsOptional()
    @IsDecimal({ decimal_digits: '0,2' })
    prix_achat?: number;
  
    @IsOptional()
    @IsDecimal({ decimal_digits: '0,2' })
    prix_vente?: number;
  
    @IsOptional()
    @IsDate()
    date_reception?: Date;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    code_produit?: string;
  
    @IsOptional()
    @IsInt()
    id_fournisseur?: number;
  
    @IsOptional()
    @IsInt()
    id_boutique?: number;
  
    @IsOptional()
    @IsInt()
    seuil_alerte?: number;
  }
  