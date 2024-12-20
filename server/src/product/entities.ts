import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  matricule: string;

  @Column()
  telephone: string;

  @Column()
  role: string;

  @Column()
  mot_de_passe: string;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.id)
  @JoinColumn({ name: 'id_categorie' })
  id_categorie: number;

  @Column()
  quantite: number;

  @Column('decimal', { precision: 10, scale: 2 })
  prix_achat: number;

  @Column('decimal', { precision: 10, scale: 2 })
  prix_vente: number;

  @Column()
  date_reception: Date;

  @Column('text')
  description: string;

  @Column()
  code_produit: string;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.id)
  @JoinColumn({ name: 'id_fournisseur' })
  id_fournisseur: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.id)
  @JoinColumn({ name: 'id_boutique' })
  id_boutique: number;

  @Column()
  seuil_alerte: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}

@Entity()
export class Boutique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column()
  lieu: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_proprietaire' })
  id_proprietaire: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_proprietaire' })
  id_proprietaire: number;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}

@Entity()
export class Fournisseur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  adresse: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}

@Entity()
export class Vente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.id)
  @JoinColumn({ name: 'id_boutique' })
  id_boutique: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  id_user: number;

  @Column()
  date_vente: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  montant_total: number;

  @Column()
  statut: string;
}

@Entity()
export class LigneVente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vente, (vente) => vente.id)
  @JoinColumn({ name: 'id_vente' })
  id_vente: number;

  @ManyToOne(() => Produit, (produit) => produit.id)
  @JoinColumn({ name: 'id_produit' })
  id_produit: number;

  @Column()
  quantite: number;

  @Column('decimal', { precision: 10, scale: 2 })
  prix_unitaire: number;

  @Column('decimal', { precision: 10, scale: 2 })
  montant_total: number;
}

@Entity()
export class Approvisionnement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boutique, (boutique) => boutique.id)
  @JoinColumn({ name: 'id_boutique' })
  id_boutique: number;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.id)
  @JoinColumn({ name: 'id_fournisseur' })
  id_fournisseur: number;

  @Column()
  date_approvisionnement: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  montant_total: number;
}

@Entity()
export class LigneApprovisionnement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Approvisionnement, (approvisionnement) => approvisionnement.id)
  @JoinColumn({ name: 'id_approvisionnement' })
  id_approvisionnement: number;

  @ManyToOne(() => Produit, (produit) => produit.id)
  @JoinColumn({ name: 'id_produit' })
  id_produit: number;

  @Column()
  quantite: number;

  @Column('decimal', { precision: 10, scale: 2 })
  prix_unitaire: number;

  @Column('decimal', { precision: 10, scale: 2 })
  montant_total: number;
}

@Entity()
export class Tracabilite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_action: Date;

  @Column()
  type_action: string;

  @Column('text')
  description: string;

  @Column()
  entite_concernee: string;

  @Column()
  id_entite_concernee: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_utilisateur' })
  id_utilisateur: number;

  @Column()
  adresse_ip: string;

  @Column('json')
  donnees_avant: Record<string, any>;

  @Column('json')
  donnees_apres: Record<string, any>;
}
