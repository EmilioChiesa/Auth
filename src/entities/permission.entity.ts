import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

//Defino la entidad Permission
@Entity()
export class Permission {
  //Defino la estructura de la entidad Permission
  @PrimaryGeneratedColumn() //Columna de clave primaria autoincremental
  id: number;
//Columna del nombre del permiso
  @Column()
  name: string;
//Defino la relación muchos a muchos con la entidad Role
  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
//Defino la relación muchos a muchos con la entidad User
  @ManyToMany(() => User, user => user.permissions)
  users: User[];
}
