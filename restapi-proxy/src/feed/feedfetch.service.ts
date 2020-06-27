import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Article } from "./feed.proto";

@Injectable()
export class FeedFetchService {

    constructor(@Inject("FeedServiceClient") private feedServiceClient: ClientProxy) {}

    async fetch(cursor: string): Promise<Observable<Article[]>> {
        return this.feedServiceClient.send<Article[], string>({ hit: 'articles', action: 'fetch' }, cursor);
    }
}