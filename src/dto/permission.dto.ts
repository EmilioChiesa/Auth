export class CreatePermissionDto { //Exporto la clase CreatePermissionDto para la creación de permisos
name: string; //Propiedad name de tipo string
}

export class UpdatePermissionDto { //Exporto la clase UpdatePermissionDto para la actualización de permisos
  name?: string; //Propiedad name de tipo string opcional
}

export class PermissionRolesDto {   //Exporto la clase PermissionRolesDto para la asignación de roles a permisos
  roleIds: number[]; //Propiedad roleIds de tipo array de números
}