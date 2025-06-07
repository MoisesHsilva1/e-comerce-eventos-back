import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API E-COMERCE-EVENTOS')
    .setDescription(
      'API responsável por gerenciar as informações sobre o e-comerce-eventos.',
    )
    .setVersion('1.0')
    .addTag('Rotas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Api', app, document);
}
