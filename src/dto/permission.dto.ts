export class CreatePermissionDto {
name: string;
}

export class UpdatePermissionDto {
  name?: string;
}

export class PermissionRolesDto {
  roleIds: number[];
}