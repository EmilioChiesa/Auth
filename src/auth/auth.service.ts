import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';  // Asegúrate de que la importación sea correcta
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '60s' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' }); // Token de actualización válido por 7 días

    return {
      accessToken,
      refreshToken,
    };
  }
}
