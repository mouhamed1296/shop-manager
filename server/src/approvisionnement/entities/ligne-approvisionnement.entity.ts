import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Approvisionnement } from './approvisionnement.entity';
import { Produit } from 'src/product/entities/product.entity';

@Entity('ligne_approvisionnement')
export class LigneApprovisionnement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Approvisionnement, (approvisionnement) => approvisionnement.ligneApprovisionnements, { onDelete: 'CASCADE' })
  approvisionnement: number;

  @ManyToOne(() => Produit, (produit) => produit.ligneApprovisionnements, { eager: true })
  produit: number;

  @Column({ type: 'integer' })
  quantite: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prix_unitaire: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;
}
