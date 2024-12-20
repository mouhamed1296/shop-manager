import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { Vente } from 'src/vente/entities/vente.entity';
import { Category } from 'src/category/entities/category.entity';
import { Tracabilite } from 'src/tracabilite/entities/tracabilite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  matricule: string;

  @Column()
  telephone: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @OneToMany(() => Vente, (vente) => vente.id_user )
  ventes: Vente[];

  @OneToMany(() => Boutique, (boutique) => boutique.id_proprietaire)
  boutiques: Boutique[];

  @OneToMany(() => Category, (category) => category.id_proprietaire)
  categories: Category[];

  @OneToMany(() => Tracabilite, (tracabilite) => tracabilite.id_user)
  tracabilites: Tracabilite[];

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
