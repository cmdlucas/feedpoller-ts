import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceConfig } from './infra/microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger("Main");

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceConfig);
    await app.listen(() => logger.log("Poller Service App now running..."));
}

bootstrap();
