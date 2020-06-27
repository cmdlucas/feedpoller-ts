import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Article } from "./feed.proto";

@Injectable()
export class FeedStorageService {
    constructor(@Inject("FEED_SERVICE") private feedServiceClient: ClientProxy) {}

    storeFeed(feed: Article[]) {
        this.feedServiceClient.send<string, Article[]>("save.articles", feed);
    }
}