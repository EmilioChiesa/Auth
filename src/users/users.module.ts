//Importo todas las dependencias necesarias
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([User,Permission,Role])], //Defino las entidades a utilizar
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], ///Exporto el servicio para poder utilizarlo en otros módulos
})
export class UsersModule {}
