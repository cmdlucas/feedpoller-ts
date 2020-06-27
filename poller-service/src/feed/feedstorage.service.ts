import { Injectable, Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Article } from "./feed.proto";

const logger = new Logger('FeedStorageService');

@Injectable()
export class FeedStorageService {
    constructor(@Inject("FeedServiceClient") private feedServiceClient: ClientProxy) {}

    async storeFeed(feed: Article[]) {
        feed.forEach(article => {
            const storageWork = this.feedServiceClient.emit<string, Article>(
                {hit: 'articles', action: 'save'}, article);
            storageWork.subscribe(response => logger.log(response));
        })
    }
}