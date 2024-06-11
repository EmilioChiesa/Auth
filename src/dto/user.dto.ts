export class CreateUserDto {
  email: string;
  password: string;
  permissionIds: number[];
  roleIds: number[];
}

export class LoginDto {
  email: string;
  password: string;
}