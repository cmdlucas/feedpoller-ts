import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger("Main");

const tcpConfig: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
        port: 3735,
        host: "localhost"
    }
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, tcpConfig);
    await app.listen(() => {
        logger.log("Feed Service App now running...");
    });
}
bootstrap();
