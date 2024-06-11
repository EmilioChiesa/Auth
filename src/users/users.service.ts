import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { InterfaceU } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission) // Asegúrate de que Permission esté importado
    private permissionRepository: Repository<Permission>, // Añade esta línea
    @InjectRepository(Role) // Asegúrate de que Role esté importado
    private roleRepository: Repository<Role>, // Añade esta
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async assignPermissionToUser(userId: number, permissionId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['permissions'] });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    const permission = await this.permissionRepository.findOneBy({ id: permissionId });
    if (!permission) {
      throw new NotFoundException(`Permission with ID "${permissionId}" not found`);
    }
    user.permissions.push(permission);
    return this.userRepository.save(user);
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new NotFoundException(`Role with ID "${roleId}" not found`);
    }
    // Asegúrate de que user.roles esté inicializado como un array
    if (!user.roles) {
      user.roles = [];
    }
    user.roles.push(role);
    return this.userRepository.save(user);
  }

  // Método para encontrar un usuario por email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, relations: ['permissions', 'roles'] });
  }

  async userHasPermission(userId: number, permissionId: number): Promise<boolean> {
    console.log('Verifying permission for user ID:', userId); // Registro de depuración
    console.log('Verifying permission ID:', permissionId); // Registro de depuración
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['permissions'] });
    console.log('User:', user); // Registro de depuración
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    return user.permissions.some(permission => Number(permission.id) === Number(permissionId));
  }
}
