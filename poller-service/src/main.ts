import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger("Main");

const tcpOption: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: "localhost",
        port: 3737
    }
} 

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, tcpOption);
    await app.listen(() => {
        logger.log("Poller App now running...");
    });
}
bootstrap();
