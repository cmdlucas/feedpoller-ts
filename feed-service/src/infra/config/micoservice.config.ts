import path from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// load environment file variables into memory
require('dotenv').config({ 
    path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) 
});

interface Config {
    tcp: MicroserviceOptions
    redis: MicroserviceOptions
}

const config: Config = {
    tcp: {
        transport: Transport.TCP,
        options: {
            port: parseInt(process.env.TCP_PORT),
            host: process.env.TCP_HOST
        }
    },
    redis: {
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_MB_URL
        }
    }
}

export const microserviceConfig = config[`${process.env.SERVICE_PROTOCOL}`];