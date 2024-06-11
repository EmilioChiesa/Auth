import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from 'src/dto/role.dto';
import { Permission } from 'src/entities/permission.entity';


@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id); // Reutiliza findOne para manejar la excepción de no encontrado
    const updated = Object.assign(role, updateRoleDto);
    return this.roleRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
  }

  async assignPermissionToRole(roleId: number, permissionId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with ID "${roleId}" not found`);
    }
    const permission = await this.permissionRepository.findOneBy({ id: permissionId });
    if (!permission) {
      throw new NotFoundException(`Permission with ID "${permissionId}" not found`);
    }
    if (!role.permissions) {
      role.permissions = [];
    }
    role.permissions.push(permission);
    return this.roleRepository.save(role);
  }
}