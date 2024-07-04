//Importo las dependencias necesarias
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ //Registro el módulo de JWT
      global: true, //Defino el alcance global
      secret: jwtConstants.secret, //Defino la clave secreta
      signOptions: { expiresIn: '60s' }, //Defino el tiempo de expiración del token
    }),
  ],
  providers: [AuthService,AuthGuard], //Defino los servicios a utilizar
  controllers: [AuthController],
  exports: [AuthService], //Exporto el servicio de autenticación
})
export class AuthModule {}
