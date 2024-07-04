export class CreateUserDto { //Exporto la clase CreateUserDto para la creación de usuarios
  email: string; //Propiedad email de tipo string
  password: string; //Propiedad password de tipo string
  permissionIds: number[]; //Propiedad permissionIds de tipo array de números
  roleIds: number[]; //Propiedad roleIds de tipo array de números
}

export class LoginDto { //Exporto la clase LoginDto para el login de usuarios
  email: string; //Propiedad email de tipo string
  password: string; //Propiedad password de tipo string
}