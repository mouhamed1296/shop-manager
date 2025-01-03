import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Vente } from 'src/vente/entities/vente.entity';
import { Produit } from 'src/product/entities/product.entity';
import { Approvisionnement } from 'src/approvisionnement/entities/approvisionnement.entity';
import { Category } from 'src/category/entities/category.entity';
import { Fournisseur } from 'src/fournisseur/entities/fournisseur.entity';

@Entity('boutique')
export class Boutique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  libelle: string;

  @Column({ type: 'varchar', length: 255 })
  lieu: string;

  @ManyToOne(() => User, (user) => user.boutiques)
  id_proprietaire: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;

  @OneToMany(() => Produit, (produit) => produit.boutique)
  produits: Produit[];

  @OneToMany(() => Vente, (vente) => vente.boutique)
  ventes: Vente[];

  @OneToMany(() => Approvisionnement, (approvisionnement) => approvisionnement.boutique)
  approvisionnements: Approvisionnement[];

  @OneToMany(() => Category, (categorie) => categorie.id_boutique)
  categories: Category[];
  
  @OneToMany(() => Fournisseur, (fournisseur) => fournisseur.id_boutique)
  fournisseurs: Fournisseur[];
}
