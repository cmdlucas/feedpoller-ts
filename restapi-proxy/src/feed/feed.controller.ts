import { Controller, Get, Query } from "@nestjs/common";
import { FeedFetchService } from "./feedfetch.service";

@Controller('feed')
export class FeedController {
    constructor(private feedFetchService: FeedFetchService){}

    @Get()
    async fetchLatestFeed(@Query('cursor') cursor: string) {
        return await this.feedFetchService.fetch(cursor || "");
    }
}