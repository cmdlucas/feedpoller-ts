import { Controller, Get, Param, Post } from "@nestjs/common";
import { FeedFetchService } from "./feedfetch.service";

@Controller('feed')
export class FeedController {
    constructor(private feedFetchService: FeedFetchService){}

    @Get()
    async fetchLatestFeed(@Param('cursor') cursor: string) {
        return this.feedFetchService.fetch(cursor);
    }
}