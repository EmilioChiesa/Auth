//Importo las dependencias necesarias
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { RoleService } from './role.service';

//Defino el controlador de roles
@Controller('roles')
export class RoleController {
  //Inyecto el servicio de roles
  constructor(private readonly roleService: RoleService) {}

  @Post() //Defino la petición POST para crear un rol
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> { //Recibo los datos del rol a crear
    return this.roleService.create(createRoleDto); //Llamo al método create() del servicio y le paso los datos recibidos
  }

  @Get() //Defino la petición GET para obtener todos los roles
  findAll(): Promise<Role[]> { //Devuelve un array de objetos de tipo Role
    return this.roleService.findAll(); //Llamo al método findAll() del servicio
  }

  @Put(':id') //Defino la petición PUT para actualizar un rol
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> { //Recibo el ID por Param y los datos del rol a actualizar por Body
    return this.roleService.update(+id, updateRoleDto); //Llamo al método update() del servicio y le paso el ID y los datos recibidos del rol a actualizar
  }

  @Delete(':id') //Defino la petición DELETE para eliminar un rol
  remove(@Param('id') id: string): Promise<void> {  //Recibo el ID por Param
    return this.roleService.remove(+id); //Llamo al método remove() del servicio y le paso el ID recibido del rol a eliminar
  }

  @Post(':id/permissions') //Defino la petición POST para asignar un permiso a un rol
  async assignPermissionToRole(@Param('id') roleId: string, @Body() body: { permissionId: number }): Promise<Role> { //Recibo el ID del rol por Param y el ID del permiso por Body
  return this.roleService.assignPermissionToRole(+roleId, body.permissionId); //Llamo al método assignPermissionToRole() del servicio y le paso los IDs recibidos 
}
}