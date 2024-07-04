export class CreateRoleDto { //Defino la clase CreateRoleDto
    code: string; //Propiedad code de tipo string
    description: string; //Propiedad description de tipo string
    permissionIds: number[]; //Propiedad permissionIds de tipo array de números
}
export class UpdateRoleDto { //Defino la clase UpdateRoleDto
    code?: string; //Propiedad code de tipo string opcional
    description?: string; //Propiedad description de tipo string opcional
    permissionIds?: number[]; //Propiedad permissionIds de tipo array de números opcional
}