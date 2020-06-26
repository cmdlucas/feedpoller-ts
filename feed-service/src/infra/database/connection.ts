import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import path from 'path';

export const DatabaseModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
        name: "default",
        type: "mysql",
        host: config.get<string>("DB_HOST"),
        port: parseInt(config.get<string>("DB_PORT")),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        database: config.get<string>("DB_NAME"),
        synchronize: config.get<string>("DB_SYNC") === "true",
        entities: [path.join(process.cwd(), "/dist/modules/**/*.entity.js")]
    })
});