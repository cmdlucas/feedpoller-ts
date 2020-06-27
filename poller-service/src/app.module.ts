import { Module } from '@nestjs/common';
import { PollerService } from './poller/poller.service';
import { FeedStorageService } from './feed/feedstorage.service';
import { FeedServiceClientModule } from './infra/feedservice.client';
import { PollerController } from './poller/poller.controller';

@Module({
    imports: [FeedServiceClientModule],
    controllers: [PollerController],
    providers: [PollerService, FeedStorageService],
})
export class AppModule { }
