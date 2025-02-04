//Importo las dependencias necesarias
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Permission } from 'src/entities/permission.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role,Permission])], //Defino las entidades que voy a utilizar
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
