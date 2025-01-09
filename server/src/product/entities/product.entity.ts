import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { LigneApprovisionnement } from '../../approvisionnement/entities/ligne-approvisionnement.entity';
import { Category } from 'src/category/entities/category.entity';
import { LigneVente } from 'src/vente/entities/ligne-vente.entity';
import { User } from 'src/user/entities/user.entity';


@Entity('produit')
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  libelle: string;

  @ManyToOne(() => Category, (category) => category.produits)
  categorie: number;

  @Column({ type: 'int' })
  quantite: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prix_achat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prix_vente: number;

  @Column({ type: 'timestamp' })
  date_reception: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  code_produit: string;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.produits)
  fournisseur: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.produits)
  boutique: number;

  @Column({ type: 'int' })
  seuil_alerte: number;

  @OneToMany(() => LigneApprovisionnement, (ligneApprovisionnement) => ligneApprovisionnement.produit)
  ligneApprovisionnements: LigneApprovisionnement[];

  @OneToMany(() => LigneVente, (ligneVente) => ligneVente.produit)
  ligneVentes: LigneVente[];

  @ManyToOne(() => User, (user) => user.produits)
  user: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}
