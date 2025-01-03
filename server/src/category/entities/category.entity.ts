import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Produit } from 'src/product/entities/product.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nom: string;

  @ManyToOne(() => Boutique, boutique => boutique.categories) 
  id_boutique: number;


  @CreateDateColumn({ type: 'timestamp' })
  date_creation: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  date_modification: Date;

  @OneToMany(() => Produit, produit => produit.categorie) 
  produits: Produit[];
}
