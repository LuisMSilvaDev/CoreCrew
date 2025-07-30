import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CoreCrew API')
    .setDescription('HR Management System API Documentation')
    .setVersion('1.0')
    .addTag('hr', 'Human Resources operations')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 CoreCrew API is running on port ${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();