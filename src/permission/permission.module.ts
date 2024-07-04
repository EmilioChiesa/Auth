//Importo las dependencias necesarias
import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])], //Defino las entidades a utilizar
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
