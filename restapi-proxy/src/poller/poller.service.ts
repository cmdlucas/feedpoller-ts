import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Article } from "../feed/feed.proto";

const logger = new Logger("PollerService");

@Injectable()
export class PollerService {

    constructor(private configService: ConfigService){}

    async startPolling(queryStrings: string[]) {

    }
}