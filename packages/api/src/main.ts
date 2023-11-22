import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as helmet } from 'helmet';
import { AppModule } from './app.module';
import { ApplicationConfigurationToken } from './app.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.use(helmet());

  const configService = app.get(ConfigService);
  const apiPort = configService.getOrThrow<number>(
    `${ApplicationConfigurationToken}.API_PORT`,
  );

  await app.listen(apiPort, '0.0.0.0');
}

bootstrap();
