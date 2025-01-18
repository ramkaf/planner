export class CreateRoleDto {
  name: string;
  description: string;
}

export class AssignPermissionsDto {
  permissionIds: number[];
}
