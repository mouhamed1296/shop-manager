export class CreateUserDto {
  readonly nom: string;
  readonly prenom: string;
  readonly email: string;
  readonly telephone: string;
  password: string;
  readonly matricule: string;$
  readonly accountCreatorId?: number; // ID of the user who created this account
  readonly roleIds?: number[]; // Optional role IDs to assign to the user
}
