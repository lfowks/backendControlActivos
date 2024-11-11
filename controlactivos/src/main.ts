import 'module-alias/register'; // Este import debe ser lo primero en el archivo
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      process.env.FRONTEND_URL || 'https://frontend-ctp-yho1.vercel.app/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en: ${await app.getUrl()}`);
}

bootstrap();
