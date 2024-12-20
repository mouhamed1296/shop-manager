export class CreateRoleDto {
  readonly name: string;
  readonly permissionIds: number[]; // Array of permission IDs to associate with the role
}
