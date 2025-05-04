import 'newrelic';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
  });
  await app.listen(process.env.PORT_SERVER as string);
}
bootstrap();
