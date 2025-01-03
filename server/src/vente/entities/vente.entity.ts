import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LigneVente } from './ligne-vente.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('vente')
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.ventes, { eager: true, onDelete: 'CASCADE' })
  boutique: number;

  @ManyToOne(() => User, (user) => user.ventes, { eager: true, onDelete: 'CASCADE' })
  user: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_vente: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;

 /*  @Column({ type: 'varchar', length: 255 })
  statut: string; */

  @OneToMany(() => LigneVente, (ligneVente) => ligneVente.vente)
  ligneVentes: LigneVente[];
}
