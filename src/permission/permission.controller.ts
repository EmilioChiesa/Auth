import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/dto/permission.dto';
import { Permission } from 'src/entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(+id);
  }
}