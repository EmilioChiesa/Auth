//Importo las dependencias necesarias
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

//Controlador de autenticación
@Controller('auth')
export class AuthController {
  //Inyecto el servicio de AuthService
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) //Defino el código de respuesta HTTP
  @Post('login') //Defino la petición POST para el login
  async signIn(@Body() signInDto: { email: string; password: string }) { //Recibe los datos del usuario a autenticar por Body
    return this.authService.signIn(signInDto.email, signInDto.password); //Llama al método signIn del servicio de autenticación
  }

  @UseGuards(AuthGuard) //Defino el Guard de autenticación para testear la autenticación
  @Get('profile') //Defino la petición GET para obtener el perfil del usuario autenticado 
  async getProfile(@Request() req) { //Recibe la petición
    return req.user; //Devuelve el usuario autenticado
  }
}
