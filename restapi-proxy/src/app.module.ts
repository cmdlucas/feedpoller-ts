import { Module } from '@nestjs/common';
import { PollerService } from './poller/poller.service';
import { AppController } from './app.controller';
import { FeedController } from './feed/feed.controller';
import { FeedFetchService } from './feed/feedfetch.service';
import { PollerController } from './poller/poller.controller';
import { FeedServiceClientModule } from './infra/feedservice.client';
import { PollerServiceClientModule } from './infra/pollerservice.client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true
        }), FeedServiceClientModule, PollerServiceClientModule
    ],
    controllers: [AppController, FeedController, PollerController],
    providers: [ConfigService, PollerService, FeedFetchService],
})
export class AppModule { }
