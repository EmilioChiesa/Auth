//Importo las dependencias necesarias
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from 'src/dto/role.dto';
import { Permission } from 'src/entities/permission.entity';

//Defino la clase como inyectable
@Injectable()
export class RoleService {
  //Inyecto los repositorios necesarios
  constructor(
    @InjectRepository(Role) //Inyecto el repositorio de roles
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) //Inyecto el repositorio de permisos
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  //Método para crear un rol
  async create(createRoleDto: CreateRoleDto): Promise<Role> { //Recibe un objeto con la estructura de datos del DTO y devuelve un objeto de tipo Role
    const role = this.roleRepository.create(createRoleDto); //Creo un objeto de tipo Role con los datos recibidos
    return this.roleRepository.save(role); //Guardo el rol en la base de datos
  }
 
  //Método para obtener todos los roles
  async findAll(): Promise<Role[]> { //Devuelve un array de objetos de tipo Role
    return this.roleRepository.find(); //Devuelvo todos los roles de la base de datos con el metodo find()
  }

  //Método para obtener un rol por ID
  async findOne(id: number): Promise<Role> { //Recibe el ID por parametro y devuelve un objeto de tipo Role
    const role = await this.roleRepository.findOneBy({ id }); //Devuelvo el rol con el ID recibido
    if (!role) { //Si no se encuentra el rol
      throw new NotFoundException(`Role with ID "${id}" not found`); //Lanzo una excepción de no encontrado
    }
    return role; //Devuelvo el rol encontrado
  }

  //Método para actualizar un rol
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> { //Recibe por parametro el ID del rol y un objeto con la estructura de datos del DTO y devuelve un objeto de tipo Role
    const role = await this.findOne(id); // Busco el rol por ID
    const updated = Object.assign(role, updateRoleDto); // Actualizo el rol con los datos recibidos mediante el metodo assign()
    return this.roleRepository.save(updated); // Guardo el rol actualizado en la base de datos
  }

  //Método para eliminar un rol
  async remove(id: number): Promise<void> { //Recibe el ID del rol por parametro y no devuelve nada
    const result = await this.roleRepository.delete(id); //Elimino el rol con el ID recibido
    if (result.affected === 0) { //Si no se elimina ningún rol
      throw new NotFoundException(`Role with ID "${id}" not found`); //Lanzo una excepción de no encontrado
    }
  }

  //Método para asignar un permiso a un rol
  async assignPermissionToRole(roleId: number, permissionId: number): Promise<Role> { //Recibe el ID del rol y del permiso por parametro y devuelve un objeto de tipo Role
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] }); //Busco el rol por ID y trae todos sus permisos en conjunto con los permisos asociados
    if (!role) { //Si no existe el rol
      throw new NotFoundException(`Role with ID "${roleId}" not found`); //Lanzo una excepción
    }
    const permission = await this.permissionRepository.findOneBy({ id: permissionId }); //Busco el permiso por ID
    if (!permission) { //Si no existe el permiso
      throw new NotFoundException(`Permission with ID "${permissionId}" not found`); //Lanzo una excepción
    }
    if (!role.permissions) { //Si el rol no tiene permisos
      role.permissions = []; //Inicializo el array de permisos
    }
    role.permissions.push(permission); //Agrego el permiso al array de permisos del rol
    return this.roleRepository.save(role); //Guardo el rol en la base de datos
  }
}