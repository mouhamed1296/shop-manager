import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LigneVente } from './ligne-vente.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('vente')
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.ventes, { eager: true, onDelete: 'CASCADE' })
  id_boutique: Boutique;

  @ManyToOne(() => User, (user) => user.ventes, { eager: true, onDelete: 'CASCADE' })
  id_user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_vente: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;

  @Column({ type: 'varchar', length: 50 })
  statut: string;

  @OneToMany(() => LigneVente, (ligneVente) => ligneVente.id_vente)
  ligneVentes: LigneVente[];
}
