//Importa las dependencias necesarias
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';  // Asegúrate de que la importación sea correcta
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

//Defino la clase AuthService
@Injectable()
export class AuthService {
  //Defino el constructor con los servicios a utilizar
  constructor(
    private usersService: UserService, // Inyecto el servicio de usuarios
    private jwtService: JwtService // Inyecto el servicio de JWT para la generación de tokens
  ) {}

  //Método para el login de usuarios
  async signIn(email: string, pass: string): Promise<{ accessToken: string; refreshToken: string }> { //Recibe el email y la contraseña del usuario a autenticar y devuelve un objeto con el token de acceso y el token de actualización
    const user = await this.usersService.findOneByEmail(email); //Busca un usuario por email mediante el método findOneByEmail() del servicio de usuarios
    if (!user || !(await bcrypt.compare(pass, user.password))) { //Si no encuentra el usuario o la contraseña no coincide
      throw new UnauthorizedException(); //Lanza una excepción de no autorizado
    }

    const payload = { id: user.id, email: user.email }; //Defino el payload del token con el ID y el email del usuario
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '60s' }); //Genero el token de acceso válido por 60 segundos
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' }); // Token de actualización válido por 7 días

    return { //Devuelvo el token de acceso y el token de actualización
      accessToken,
      refreshToken,
    };
  }
}
