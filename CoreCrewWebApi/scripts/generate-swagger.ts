import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateSwaggerSpec() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('CoreCrew API')
    .setDescription('HR Management System API Documentation')
    .setVersion('1.0')
    .addTag('hr', 'Human Resources operations')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Create docs directory if it doesn't exist
  const docsDir = path.join(__dirname, '..', 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Write swagger.json
  const swaggerPath = path.join(docsDir, 'swagger.json');
  fs.writeFileSync(swaggerPath, JSON.stringify(document, null, 2));
  
  console.log('✅ Swagger documentation generated successfully!');
  console.log(`📄 Swagger JSON saved to: ${swaggerPath}`);
  console.log('🚀 Run "npm run docs" to start the server with Swagger UI');
  
  await app.close();
  process.exit(0);
}

generateSwaggerSpec().catch((error) => {
  console.error('❌ Error generating Swagger documentation:', error);
  process.exit(1);
});
