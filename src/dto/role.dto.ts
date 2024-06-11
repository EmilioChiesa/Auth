export class CreateRoleDto {
    code: string;
    description: string;
    permissionIds: number[];
}
export class UpdateRoleDto {
    code?: string;
    description?: string;
    permissionIds?: number[];
}