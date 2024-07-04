//Importo todas las dependencias necesarias
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/extended-request.interface';
import { Permission } from 'src/entities/permission.entity';
import { AuthGuard } from 'src/auth/auth.guard';

//Defino el controlador de usuarios
@Controller('users')
export class UserController {
  //Inyecto el servicio de usuarios
  constructor(private readonly userService: UserService) {}

  @Post() //Defino la pteición POST para crear un usuario
  create(@Body() createUserDto: CreateUserDto) { //Recibo los datos del usuario a crear
    return this.userService.create(createUserDto); //Llamo al método create() del servicio y le paso los datos recibidos
  }

  @Get() //Defino la petición GET para obtener todos los usuarios
  findAll() { 
    return this.userService.findAll(); //Llamo al método findAll() del servicio
  }

  @Get(':id') //Defino la petición GET para obtener un usuario por ID
  findOne(@Param('id') id: string) { //Recibo el ID por Param 
    return this.userService.findOne(+id); //Llamo al método findOne() del servicio y le paso el ID recibido
  }

  @Patch(':id') //Defino la petición PATCH para actualizar un usuario
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) { //Recibo el ID por Param y los datos del usuario a actualizar por Body
    return this.userService.update(+id, updateUserDto); //Llamo al método update() del servicio y le paso el ID y los datos recibidos
  }

  @Delete(':id') //Defino la petición DELETE para eliminar un usuario
  remove(@Param('id') id: string) { //Recibo el ID por Param
    return this.userService.remove(+id); //Llamo al método remove() del servicio y le paso el ID recibido
  }

  @Post(':id/permissions') //Defino la petición POST para asignar un permiso a un usuario
  async assignPermissionToUser(@Param('id') userId: string, @Body() body: { permissionId: number }): Promise<User> { //Recibo el ID del usuario por Param y el ID del permiso por Body
  return this.userService.assignPermissionToUser(+userId, body.permissionId); //Llamo al método assignPermissionToUser() del servicio y le paso los IDs recibidos
}

@Post(':id/roles') //Defino la petición POST para asignar un rol a un usuario
async assignRoleToUser(@Param('id') userId: string, @Body() body: { roleId: number }): Promise<User> { //Recibo el ID del usuario por Param y el ID del rol por Body
  return this.userService.assignRoleToUser(+userId, body.roleId); //Llamo al método assignRoleToUser() del servicio y le paso los IDs recibidos
}

@UseGuards(AuthGuard) //Defino el Gaurd para verificar si el usuario está autenticado
@Get('can-do/:permissionId') //Defino la petición GET para verificar si un usuario tiene un permiso
async canDo(@Param('permissionId') permissionId: number, @Req() request: RequestWithUser): Promise<{ canDo: boolean }> { //Recibo el ID del permiso por Param y la Request
  const user = request.user; //Obtengo el usuario autenticado mediante la Request usando la propiedad user de la interfaz RequestWithUser
  console.log('Authenticated user:', user); // Registro de depuración
  const canDo = await this.userService.userHasPermission(user.id, permissionId); //Llamo al método userHasPermission() del servicio y le paso el ID del usuario y del permiso
  if (!canDo) { //Si el usuario no tiene el permiso
    throw new UnauthorizedException(`User does not have the permission with ID "${permissionId}"`); //Lanzo una excepción de no autorizado
  }
  return { canDo }; //Devuelvo un objeto con la propiedad canDo, que indica si el usuario tiene el permiso
}
}