import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { Fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
import { LigneApprovisionnement } from './ligne-approvisionnement.entity';

@Entity('approvisionnement')
export class Approvisionnement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.approvisionnements)
  id_boutique: Boutique;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.approvisionnements)
  id_fournisseur: Fournisseur;

  @CreateDateColumn({ type: 'timestamp' })
  date_approvisionnement: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;

  @OneToMany(() => LigneApprovisionnement, (ligneApprovisionnement) => ligneApprovisionnement.id_approvisionnement)
  ligneApprovisionnements: LigneApprovisionnement[];
}
