import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Produit } from 'src/product/entities/product.entity';
import { Approvisionnement } from 'src/approvisionnement/entities/approvisionnement.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';

@Entity('fournisseur')
export class Fournisseur {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Boutique, (boutique) => boutique.fournisseurs)
  id_boutique: number;

  @Column({ type: 'varchar', length: 255 })
  nom: string;

  @Column({ type: 'varchar', length: 255 })
  adresse: string;

  @Column({ type: 'varchar', length: 20 })
  telephone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;

  @OneToMany(() => Produit, (produit) => produit.fournisseur)
  produits: Produit[];

  @OneToMany(() => Approvisionnement, (approvisionnement) => approvisionnement.fournisseur)
  approvisionnements: Approvisionnement[];
}
