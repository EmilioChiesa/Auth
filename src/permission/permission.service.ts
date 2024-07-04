//Importo las dependencias necesarias
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/dto/permission.dto';
import { Permission } from 'src/entities/permission.entity'

//Defino el servicio de permisos
@Injectable()
export class PermissionService {
  //Inyecto el repositorio de permisos
  constructor(
    @InjectRepository(Permission) //Inyecto el repositorio de permisos
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  //Método para crear un permiso
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> { //Recibe los datos del permiso a crear
    const permission = this.permissionRepository.create(createPermissionDto); //Crea un objeto de tipo Permission con los datos recibidos
    return this.permissionRepository.save(permission); //Guarda el objeto creado en la base de datos
  }

  //Método para obtener todos los permisos
  async findAll(): Promise<Permission[]> { //Devuelve un array de objetos de tipo Permission
    return this.permissionRepository.find(); //Devuelve todos los permisos de la base de datos
  }

  //Método para obtener un permiso por ID
  async findOne(id: number): Promise<Permission> { //Recibe el ID del permiso a buscar
    const permission = await this.permissionRepository.findOneBy({ id }); //Busca un permiso por ID mediante el metodo findOneBy() del  repositorio
    if (!permission) { //Si no encuentra el permiso
      throw new NotFoundException(`Permission with ID "${id}" not found`); //Lanza una excepción de no encontrado
    }
    return permission; //Devuelve el permiso encontrado
  }

  //Método para actualizar un permiso
  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> { //Recibe el ID del permiso a actualizar y los datos del permiso a actualizar
    const permission = await this.findOne(id); //Busca el permiso por ID mediante el método findOne() del repositorio
    const updated = Object.assign(permission, updatePermissionDto); //Actualiza el objeto con los datos recibidos
    return this.permissionRepository.save(updated); //Guarda el objeto actualizado en la base de datos
  }

  //Método para eliminar un permiso
  async remove(id: number): Promise<void> { //Recibe el ID del permiso a eliminar
    const result = await this.permissionRepository.delete(id); //Elimina el permiso de la base de datos mediante el método delete() del repositorio con el ID recibido
    if (result.affected === 0) { //Si no se elimina ningún permiso
      throw new NotFoundException(`Permission with ID "${id}" not found`); //Lanza una excepción de no encontrado
    }
  }
}