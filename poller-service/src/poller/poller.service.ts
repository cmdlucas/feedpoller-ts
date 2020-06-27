import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FeedStorageService } from "../feed/feedstorage.service";
import { Article } from "../feed/feed.proto";
import NewsApi from 'newsapi';

const logger = new Logger("PollerService");

@Injectable()
export class PollerService {
    private readonly newsapi: any;

    constructor(private configService: ConfigService, private feedStorageService: FeedStorageService){
        this.newsapi = new NewsApi(this.configService.get<string>("NEWS_API_KEY")).v2;
    }

    async startPolling(queryStrings: string[]) {
        queryStrings.forEach(queryString => {
            setInterval(
                () => this.poll(queryString), 
                parseInt(this.configService.get<string>("POLL_INTERVAL_IN_MS"))
            );
        });
    }

    private async poll(queryString: string) {
        this.newsapi.v2.everything({
            q: queryString
        }).then(res => {
            logger.log(res);
            if(res.status === "ok") {
                this.feedStorageService.storeFeed(res.articles as Article[])
                return;
            }
            throw new Error(res.message);
        }).catch(error => {
            logger.error(error);
        })
    }

    private getEverythingEndpont(queryString: string) {
        return this.configService.get<string>("NEWS_API_ROOT")
                    .concat("/")
                    .concat(this.configService.get<string>("NEWS_API_ENDPOINT_EVERYTHING"))
                    .concat("?q=").concat(queryString);
    }
}