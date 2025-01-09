export class CreateVenteDto {
    id: number;
    produit: [
        {
            id: number;
            produit: number;
            quantite: number;
            prix_unitaire: number;
            montant_total: number;
        }
    ];
    quantite: number;
    montant_total: number;
    boutique: number;
    user: number;
    statut: string;
    date_vente: Date;
    
}
