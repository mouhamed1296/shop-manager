import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vente } from './vente.entity';
import { Produit } from 'src/product/entities/product.entity';

@Entity('ligne_vente')
export class LigneVente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vente, (vente) => vente.ligneVentes, { eager: true, onDelete: 'CASCADE' })
  id_vente: Vente;

  @ManyToOne(() => Produit, (produit) => produit.ligneVentes, { eager: true, onDelete: 'CASCADE' })
  id_produit: Produit;

  @Column({ type: 'int' })
  quantite: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prix_unitaire: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;
}
