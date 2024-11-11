import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS con configuración dinámica
  app.enableCors({
    origin: [
      'http://localhost:5173', // Frontend local para desarrollo
      process.env.FRONTEND_URL || 'https://tu-frontend-desplegado.vercel.app', // URL del frontend desplegado
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Escuchar en el puerto configurado en Render o en el puerto 3000 por defecto
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en: ${await app.getUrl()}`);
}

bootstrap();
