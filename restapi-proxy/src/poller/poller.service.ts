import { Injectable, Logger, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Article } from "../feed/feed.proto";
import { ClientProxy } from "@nestjs/microservices";

const logger = new Logger("PollerService");

@Injectable()
export class PollerService {

    constructor(@Inject('PollerServiceClient') private pollerServiceClient: ClientProxy){}

    async startPolling(queryStrings: string[]) {

    }
}