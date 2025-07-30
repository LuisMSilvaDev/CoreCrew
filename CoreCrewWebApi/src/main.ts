import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS~

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 CoreCrew API is running on port ${port}`);
}

bootstrap();