import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

// Define una interfaz extendida para el objeto de solicitud (Request)
interface ExtendedRequest extends Request {
  user?: any; // Aquí defines la propiedad 'user'
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendedRequest>(); // Usa la interfaz extendida
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // Asignamos el payload al objeto de solicitud (request) aquí
      // para que podamos acceder a él en nuestros controladores de ruta
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: ExtendedRequest): string | undefined { // Usa la interfaz extendida
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Ignora 'Bearer ' y devuelve solo el token
    }
    return undefined;
  }
}
