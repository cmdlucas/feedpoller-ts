import { Controller, Get, Body, UsePipes, Param, Query, Logger } from '@nestjs/common';
import { CreateArticleRequestDto } from '../dto/createarticlerequest.dto';
import { CreateArticleService } from '../service/createarticle.service';
import { failureResponse, dataResponse } from '../../../core/logic/Output';
import { ErrorInfo } from '../../../core/logic/Errors';
import { CreateArticleRequestPipe } from '../validator/CreateArticleRequest.pipe';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FetchArticlesService } from '../service/fetcharticles.service';
import { FetchArticlesRequestPipe } from '../validator/FetchArticlesRequest.pipe';

const logger = new Logger('ArticleController');

@Controller()
export class ArticleController {
    constructor(private createArticleService: CreateArticleService, private fetchArticlesService: FetchArticlesService) { }

    @MessagePattern({ hit: 'articles', action: 'save' })
    @UsePipes(CreateArticleRequestPipe)
    async saveArticle(@Payload() req: CreateArticleRequestDto) {
        logger.log("Saving some articles... ");
        const savedArticleOrError = await this.createArticleService.execute(req);

        if (savedArticleOrError.isFailure()) {
            return failureResponse([(savedArticleOrError.value as ErrorInfo).message])
        }

        return dataResponse(savedArticleOrError.value);
    }

    @MessagePattern({ hit: 'articles', action: 'fetch' })
    @UsePipes(FetchArticlesRequestPipe)
    async fetchArticles(@Payload() payload: number) {
        logger.log("Fetching some saved articles... ");
        const fetchedArticlesOrError = await this.fetchArticlesService.fetchTenBeforeCursor(payload)

        if(fetchedArticlesOrError.isFailure())
            return failureResponse([(fetchedArticlesOrError.value as ErrorInfo).message]);

        return dataResponse(fetchedArticlesOrError.value);
    }
}