import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { InterfaceU } from 'src/interfaces/user.interface';

@Entity()
export class User extends BaseEntity implements InterfaceU{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Permission, permission => permission.users)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
