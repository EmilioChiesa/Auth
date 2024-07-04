//Importo todas las dependencias necesarias
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UsersModule } from './users/users.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ //Configuración de la conexión a la base de datos
      type: 'sqlite', //Tipo de base de datos
      database: 'tp.db', //Nombre de la base de datos
      entities: [User, Role, Permission], //Entidades a utilizar
      synchronize: true, //Sincronizar la base de datos
    }),
    UsersModule,
    PermissionModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
