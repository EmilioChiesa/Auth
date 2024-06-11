import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/extended-request.interface';
import { Permission } from 'src/entities/permission.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post(':id/permissions')
  async assignPermissionToUser(@Param('id') userId: string, @Body() body: { permissionId: number }): Promise<User> {
  return this.userService.assignPermissionToUser(+userId, body.permissionId);
}

@Post(':id/roles')
async assignRoleToUser(@Param('id') userId: string, @Body() body: { roleId: number }): Promise<User> {
  return this.userService.assignRoleToUser(+userId, body.roleId);
}

@UseGuards(AuthGuard)
@Get('can-do/:permissionId')
async canDo(@Param('permissionId') permissionId: number, @Req() request: RequestWithUser): Promise<{ canDo: boolean }> {
  const user = request.user; // Aquí es donde obtenemos el usuario
  console.log('Authenticated user:', user); // Registro de depuración
  const canDo = await this.userService.userHasPermission(user.id, permissionId);
  if (!canDo) {
    throw new UnauthorizedException(`User does not have the permission with ID "${permissionId}"`);
  }
  return { canDo };
}
}