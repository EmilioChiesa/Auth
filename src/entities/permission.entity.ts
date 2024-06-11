import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @ManyToMany(() => User, user => user.permissions)
  users: User[];
}
