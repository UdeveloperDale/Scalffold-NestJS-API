import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let appInsights = require("applicationinsights");
   appInsights.setup("eebeb6b1-0761-491c-a860-bc2e0ed37d25").start();  

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Account Delegation API')
    .setDescription('Account Delegation API description')
    .setVersion('1.0')
    .addTag('Saving Account')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version',
  });

  app.enableCors({
    origin: ['http://localhost:3001']
  });


  await app.listen(AppModule.port);
}
bootstrap();
