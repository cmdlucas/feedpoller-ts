import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class FeedFetchService {

    constructor(@Inject("FeedServiceClient") private feedServiceClient: ClientProxy) {}

    async fetch(cursor: string): Promise<Observable<string>> {
        return this.feedServiceClient.send({ hit: 'articles', action: 'fetch' }, cursor);
    }
}