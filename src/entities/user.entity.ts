import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { InterfaceU } from 'src/interfaces/user.interface';

//Defino la entidad User
@Entity()
export class User extends BaseEntity implements InterfaceU{ //Extiendo de BaseEntity e implemento la interfaz InterfaceU
  //Defino la estructura de la entidad User
  @PrimaryGeneratedColumn() //Columna de clave primaria autoincremental
  id: number;
  //Columna del email del usuario
  @Column()
  email: string;
  //Columna de la contraseña del usuario
  @Column()
  password: string;
  //Defino la relación muchos a muchos con la entidad Permission
  @ManyToMany(() => Permission, permission => permission.users)
  @JoinTable()
  permissions: Permission[];
  //Defino la relación muchos a muchos con la entidad Role
  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
