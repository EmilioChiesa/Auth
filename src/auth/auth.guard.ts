//Importa las dependencias necesarias
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

// Define una interfaz extendida para el objeto de solicitud (Request)
interface ExtendedRequest extends Request {
  user?: any; // Aquí defines la propiedad 'user'
}

@Injectable()
export class AuthGuard implements CanActivate { // Implementa la interfaz CanActivate para el Guard
  // Inyecta el servicio de JWT
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> { // Implementa el método canActivate
    const request = context.switchToHttp().getRequest<ExtendedRequest>(); // Usa la interfaz extendida 
    const token = this.extractTokenFromHeader(request); // Extrae el token del encabezado de la solicitud
    if (!token) { // Si no hay token
      throw new UnauthorizedException(); // Lanza una excepción de no autorizado
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { //Verifica si el token es válido mediante el método verifyAsync() del servicio de JWT
        secret: jwtConstants.secret, // Usa la clave secreta definida en el archivo constants.ts 
      });
      // Asignamos el payload al objeto de solicitud (request) aquí
      // para que podamos acceder a él en nuestros controladores de ruta
      request.user = payload; // Asigna el payload al objeto de solicitud 
    } catch { // Si hay un error
      throw new UnauthorizedException();  // Lanza una excepción de no autorizado
    }
    return true; // Devuelve verdadero si todo está bien
  }

  // Método para extraer el token del encabezado de la solicitud
  private extractTokenFromHeader(request: ExtendedRequest): string | undefined { // Usa la interfaz extendida
    const authHeader = request.headers.authorization; // Obtiene el encabezado de autorización mediante la propiedad headers
    if (authHeader && authHeader.startsWith('Bearer ')) { // Si el encabezado comienza con 'Bearer '
      return authHeader.substring(7); // Ignora 'Bearer ' y devuelve solo el token
    }
    return undefined; // Devuelve indefinido si no hay token
  }
}
