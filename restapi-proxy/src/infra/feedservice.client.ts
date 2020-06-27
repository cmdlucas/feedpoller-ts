import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { Transport, ClientProxy, ClientProxyFactory, ClientOptions } from "@nestjs/microservices";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'FeedServiceClient',
            inject: [ConfigService],
            useFactory: (configService: ConfigService): ClientProxy => {
                const clientConnectionConfig: ClientOptions = {
                    transport: Transport.TCP,
                    options: {
                        port: parseInt(configService.get<string>("FEED_SERVICE_PORT")),
                        host: configService.get<string>("FEED_SERVICE_HOST"),
                    }
                }
                return ClientProxyFactory.create(clientConnectionConfig);
            }
        }
    ],
    exports: ['FeedServiceClient']
})
export class FeedServiceClientModule { }