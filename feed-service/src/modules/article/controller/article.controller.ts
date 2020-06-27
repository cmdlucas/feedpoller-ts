import { Controller, Get, Body, UsePipes, Param, Query, Logger } from '@nestjs/common';
import { CreateArticleRequestDto } from '../dto/createarticlerequest.dto';
import { CreateArticleService } from '../service/createarticle.service';
import { failureResponse, dataResponse } from '../../../core/logic/Output';
import { CreateArticleRequestPipe } from '../validator/CreateArticleRequest.pipe';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { FetchArticlesService } from '../service/fetcharticles.service';
import { FetchArticlesRequestPipe } from '../validator/FetchArticlesRequest.pipe';

const logger = new Logger('ArticleController');

@Controller()
export class ArticleController {
    constructor(private createArticleService: CreateArticleService, private fetchArticlesService: FetchArticlesService) { }

    @EventPattern({hit: 'articles', action: 'save'})
    @UsePipes(CreateArticleRequestPipe)
    async saveArticle(article: CreateArticleRequestDto) {
        const savedArticleOrError = await this.createArticleService.execute(article);

        if (savedArticleOrError.isFailure()) {
            return failureResponse(["Unable to save article"])
        }

        return dataResponse(savedArticleOrError.value);
    }

    @MessagePattern({ hit: 'articles', action: 'fetch' })
    @UsePipes(FetchArticlesRequestPipe)
    async fetchArticles(@Payload() cursor: number) {
        const fetchedArticlesOrError = await this.fetchArticlesService.fetchTenBeforeCursor(cursor || -1)

        if(fetchedArticlesOrError.isFailure()){
            logger.error(fetchedArticlesOrError);
            return failureResponse(["Unable to fetch article"]);
        }

        return dataResponse(fetchedArticlesOrError.value);
    }
}