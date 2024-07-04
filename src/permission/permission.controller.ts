//Importa las dependencias necesarias
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/dto/permission.dto';
import { Permission } from 'src/entities/permission.entity';
import { PermissionService } from './permission.service';

//Controlador de permisos
@Controller('permissions')
export class PermissionController {
  //Inyecto el servicio de permisos
  constructor(private readonly permissionService: PermissionService) {}

  @Post() //Defino la petición POST para crear un permiso
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> { //Recibe los datos del permiso a crear por Body usando el DTO CreatePermissionDto
    return this.permissionService.create(createPermissionDto); //Llama al método create del servicio de permisos
  }

  @Get() //Defino la petición GET para obtener todos los permisos
  findAll(): Promise<Permission[]> { //Devuelve un array de objetos de tipo Permission
    return this.permissionService.findAll(); //Llama al método findAll del servicio de permisos
  }

  @Put(':id') //Defino la petición PUT para actualizar un permiso
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<Permission> { //Recibe el ID del permiso a actualizar por Param y los datos del permiso a actualizar por Body usando el DTO UpdatePermissionDto
    return this.permissionService.update(+id, updatePermissionDto); //Llama al método update del servicio de permisos
  }

  @Delete(':id') //Defino la petición DELETE para eliminar un permiso
  remove(@Param('id') id: string): Promise<void> { //Recibe el ID del permiso a eliminar por Param
    return this.permissionService.remove(+id); //Llama al método remove del servicio de permisos
  }
}