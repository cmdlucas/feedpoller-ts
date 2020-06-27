import { Injectable, Logger, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

const logger = new Logger("PollerService");

@Injectable()
export class PollerService {

    constructor(@Inject('PollerServiceClient') private pollerServiceClient: ClientProxy){}

    async startPolling(queryStrings: string[]) {
        this.pollerServiceClient.emit({ hit: "poll", action: "start" }, queryStrings || []);
    }

    async stopAllPolling() {
        this.pollerServiceClient.emit({ hit: "poll", action: "stop_all" }, null);
    }
}