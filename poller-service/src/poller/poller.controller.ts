import { Controller, Logger } from "@nestjs/common";
import { PollerService } from "./poller.service";
import { EventPattern } from "@nestjs/microservices";

const logger = new Logger('PollerController')

@Controller()
export class PollerController {
    constructor(private pollerService: PollerService) {}

    @EventPattern({ hit: "poll", action: "start" })
    async pollForArticles(queryStrings: string[]) {
        this.pollerService.startPolling(queryStrings);
    }
    
    @EventPattern({ hit: "poll", action: "stop_all" })
    async stopAllPolling() {
        this.pollerService.stopAllPolling();
    }
}