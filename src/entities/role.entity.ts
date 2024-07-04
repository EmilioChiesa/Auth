import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

//Defino la entidad Role
@Entity()
export class Role {
  //Defino la estructura de la entidad Role
  @PrimaryGeneratedColumn() //Columna de clave primaria autoincremental
  id: number;
//Columna del código del rol
  @Column()
  code: string;
//Columna del nombre del rol
  @Column()
  description: string;
//Defino la relación muchos a muchos con la entidad Permission
  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable()
  permissions: Permission[];
//Defino la relación muchos a muchos con la entidad User
  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
