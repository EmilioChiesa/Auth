import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roleService.remove(+id);
  }

  @Post(':id/permissions')
  async assignPermissionToRole(@Param('id') roleId: string, @Body() body: { permissionId: number }): Promise<Role> {
  return this.roleService.assignPermissionToRole(+roleId, body.permissionId); //el + es para convertilo de string a number
}
}