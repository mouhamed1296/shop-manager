/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('tracabilite')
export class Tracabilite {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  date_action: Date;

  @Column({ type: 'varchar', length: 255 })
  type_action: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  entite_concernee: string;

  @Column({ type: 'integer' })
  id_entite_concernee: number;

  @Column({ type: 'varchar', length: 255 })
  adresse_ip: string;

  @Column({ type: 'json', nullable: true })
  donnees_avant: any; // Use 'any' for JSON data type

  @Column({ type: 'json', nullable: true })
  donnees_apres: any; // Use 'any' for JSON data type

  @ManyToOne(() => User, user => user.tracabilites) // Assuming User has a 'tracabilites' relation
  id_user: number;
}
