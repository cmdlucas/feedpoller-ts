import { Controller, Get, Param } from "@nestjs/common";

@Controller('feed')
export class FeedController {
    @Get()
    async fetchLatestFeed(@Param('cursor') cursor: string) {
        return "Feed"
    }
}