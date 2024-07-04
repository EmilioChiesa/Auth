//Importa las dependencias necesarias
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { InterfaceU } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

//Defino la clase como inyectable
@Injectable()
export class UserService {
  //Inyecto los repositorios necesarios
  constructor(
    @InjectRepository(User) //Inyecto el repositorio de usuarios
    private userRepository: Repository<User>, 
    @InjectRepository(Permission) //Inyecto el repositorio de permisos
    private permissionRepository: Repository<Permission>, 
    @InjectRepository(Role) //Inyecto el repositorio de roles
    private roleRepository: Repository<Role>, 
  ) {}

  //Método para crear un usuario
  async create(createUserDto: CreateUserDto): Promise<User> { //Recibe un objteo con la estructura de datos del DTO y devuelve un objeto de tipo User
    const salt = await bcrypt.genSalt(10); //Genero una sal para el hash
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt); //Genero el hash de la contraseña

    const user = this.userRepository.create({ //Creo un objeto de tipo User con los datos recibidos
      ...createUserDto, //Copio los datos del DTO
      password: hashedPassword, //Asigno la contraseña hasheada
    });

    return this.userRepository.save(user); //Guardo el usuario en la base de datos
  }

  //Método para obtener todos los usuarios
  async findAll(): Promise<User[]> { //Devuelve un array de objetos de tipo User
    return this.userRepository.find(); //Devuelvo todos los usuarios de la base de datos con el metodo find()
  }

  //Método para obtener un usuario por ID
  async findOne(id: number): Promise<User> { //Recibe el ID por parametro y devuelve un objeto de tipo User
    return this.userRepository.findOneBy({ id }); //Devuelvo el usuario con el ID recibido
  }

  //Método para obtener un usuario por email
  async findOneByEmail(email: string): Promise<User | undefined> { //Recibe el email por parametro y devuelve un objeto de tipo User o undefined
    return this.userRepository.findOne({ where: { email } }); //Devuelvo el usuario con el email recibido
  }

  //Método para actualizar un usuario
  async update(id: number, updateUserDto: CreateUserDto): Promise<User> { //Recibe por parametro el ID del usuario y un objeto con la estructura de datos del DTO y devuelve un objeto de tipo User
    await this.userRepository.update(id, updateUserDto); //Actualizo el usuario con el ID recibido mediante el metodo update() del repositorio
    return this.userRepository.findOneBy({ id }); //Devuelvo el usuario actualizado
  }

  //Método para eliminar un usuario
  async remove(id: number): Promise<void> { //Recibe el ID del usuario por parametro y no devuelve nada
    await this.userRepository.delete(id); //Elimino el usuario con el ID recibido mediante el metodo delete() del repositorio
  }

  //Método para asignar un permiso a un usuario
  async assignPermissionToUser(userId: number, permissionId: number): Promise<User> { //Recibe el ID del usuario y el ID del permiso por parametro y devuelve un objeto de tipo User
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['permissions'] }); //Busco el usuario por ID y trae todos sus permisos
    if (!user) { //Si no existe el usuario
      throw new NotFoundException(`User with ID "${userId}" not found`); //Lanzo una excepción
    }
    const permission = await this.permissionRepository.findOneBy({ id: permissionId }); //Busco el permiso por ID
    if (!permission) { //Si no existe el permiso
      throw new NotFoundException(`Permission with ID "${permissionId}" not found`); //Lanzo una excepción
    }
    user.permissions.push(permission); //Agrego el permiso al usuario
    return this.userRepository.save(user); //Guardo el usuario en la base de datos
  }

  //Método para asignar un rol a un usuario
  async assignRoleToUser(userId: number, roleId: number): Promise<User> { //Recibe el ID del usuario y el ID del rol por parametro y devuelve un objeto de tipo User
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] }); //Busco el usuario por ID y trae todos sus roles
    if (!user) { //Si no existe el usuario
      throw new NotFoundException(`User with ID "${userId}" not found`); //Lanzo una excepción
    }
    const role = await this.roleRepository.findOneBy({ id: roleId }); //Busco el rol por ID
    if (!role) { //Si no existe el rol
      throw new NotFoundException(`Role with ID "${roleId}" not found`); //Lanzo una excepción
    }
    // Verifico si el usuario ya tiene el rol asignado
    if (!user.roles) {
      user.roles = []; // Si no tiene roles asignados, creo un array vacío
    }
    user.roles.push(role); //Agrego el rol al usuario
    return this.userRepository.save(user); //Guardo el usuario en la base de datos
  }

  // Método para encontrar un usuario por email
  async findByEmail(email: string): Promise<User | undefined> { //Recibe el email por parametro y devuelve un objeto de tipo User o undefined
    return this.userRepository.findOne({ where: { email }, relations: ['permissions', 'roles'] }); //Devuelvo el usuario con el email recibido y traigo sus permisos y roles
  }

  // Método para verificar si un usuario tiene un permiso
  async userHasPermission(userId: number, permissionId: number): Promise<boolean> { //Recibe el ID del usuario y el ID del permiso por parametro y devuelve un booleano
    console.log('Verifying permission for user ID:', userId); // Registro de depuración
    console.log('Verifying permission ID:', permissionId); // Registro de depuración
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['permissions'] }); //Busco el usuario por ID y traigo sus permisos
    console.log('User:', user); // Registro de depuración
    if (!user) { //Si no existe el usuario
      throw new NotFoundException(`User with ID "${userId}" not found`); //Lanzo una excepción
    }
    return user.permissions.some(permission => Number(permission.id) === Number(permissionId)); //Devuelvo true si el usuario tiene el permiso, false si no lo tiene
  }
}
