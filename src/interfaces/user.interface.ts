import { Permission } from "src/entities/permission.entity";

export interface InterfaceU {
    email: string;
    password: string;
    permissions: Permission[];
  }