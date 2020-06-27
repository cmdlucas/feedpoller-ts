import { Controller, Post, Body } from "@nestjs/common";
import { PollerService } from "./poller.service";

@Controller('poll')
export class PollerController {
    constructor(private pollerService: PollerService) {}

    @Post()
    async startPolling(@Body('q') queryStrings: string[]) {
        this.pollerService.startPolling(queryStrings);
        return "OK";
    }
}