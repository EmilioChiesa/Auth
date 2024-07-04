import { Permission } from "src/entities/permission.entity";

export interface InterfaceU { //Defino la interfaz de usuario
    email: string; //Propiedad email de tipo string
    password: string; //Propiedad password de tipo string
    permissions: Permission[]; //Propiedad permissions de tipo array de objetos de tipo Permission
  }