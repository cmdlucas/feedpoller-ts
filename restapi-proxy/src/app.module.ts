import { Module } from '@nestjs/common';
import { PollerService } from './poller/poller.service';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FeedController } from './feed/feed.controller';
import { FeedFetchService } from './feed/feedfetchservice';

@Module({
    imports: [
        ClientsModule.register([
            { name: 'FEED_SERVICE', transport: Transport.TCP },
        ]),
    ],
    controllers: [AppController, FeedController],
    providers: [PollerService, FeedFetchService],
})
export class AppModule { }
