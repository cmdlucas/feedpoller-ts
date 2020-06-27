import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { microserviceConfig } from './infra/config/micoservice.config';

const logger = new Logger("Main");

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceConfig);
    await app.listen(() => logger.log("Feed Service App now running..."));
}

bootstrap();
