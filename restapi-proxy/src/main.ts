import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger("Main");

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => {
        logger.log("Poller App now running...");
    });
}
bootstrap();
