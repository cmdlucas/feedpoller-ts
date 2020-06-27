import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FeedStorageService } from "../feed/feedstorage.service";
import { Article } from "../feed/feed.proto";
import NewsApi from 'newsapi';

const logger = new Logger("PollerService");

@Injectable()
export class PollerService {
    private readonly newsapi: any;
    private scheduled: NodeJS.Timeout[];

    constructor(private configService: ConfigService, private feedStorageService: FeedStorageService){
        this.newsapi = new NewsApi(this.configService.get<string>("NEWS_API_KEY")).v2;
    }

    async startPolling(queryStrings: string[]) {
        (queryStrings || []).forEach(queryString => {
            this.poll(queryString);
            this.scheduled.push(setInterval(
                () => this.poll(queryString), 
                parseInt(this.configService.get<string>("POLL_INTERVAL_IN_MS"))
            ));
        });
    }

    async stopAllPolling() {
        this.scheduled && this.scheduled.forEach((work) => clearInterval(work));
    }

    private async poll(queryString: string) {
        this.newsapi.everything({
            q: queryString
        }).then(res => {
            if(res.status === "ok") {
                this.feedStorageService.storeFeed(res.articles as Article[])
                return;
            }
            throw new Error(res.message);
        }).catch(error => {
            logger.error(error);
        })
    }
}