import { Module } from '@nestjs/common';
import { PollerService } from './poller/poller.service';
import { FeedStorageService } from './feed/feedstorage.service';
import { FeedServiceClientModule } from './infra/feedservice.client';
import { PollerController } from './poller/poller.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
          isGlobal: true
      }),  FeedServiceClientModule
    ],
    controllers: [PollerController],
    providers: [PollerService, ConfigService, FeedStorageService  ],
})
export class AppModule { }
