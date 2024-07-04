import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS globalmente
  app.enableCors({
    origin: 'http://localhost:4200',  //Defino el origen permitido
    credentials: true,  // Habilita el intercambio de cookies y credenciales
  });

  await app.listen(3001);
}
bootstrap();
