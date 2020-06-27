import { Controller, Get, Body, UsePipes } from '@nestjs/common';
import { CreateArticleRequestDto } from '../dto/createarticlerequest.dto';
import { CreateArticleService } from '../service/createarticle.service';
import { failureResponse, dataResponse } from '../../../core/logic/Output';
import { ErrorInfo } from '../../../core/logic/Errors';
import { CreateArticleRequestPipe } from '../validator/CreateArticleRequest.pipe';
import { MessagePattern } from '@nestjs/microservices';

@Controller('articles')
export class ArticleController {
    constructor(private createArticleService: CreateArticleService) { }

    @Get()
    @UsePipes(CreateArticleRequestPipe)
    async saveArticle(@Body() req: CreateArticleRequestDto) {
        const savedArticleOrError = await this.createArticleService.execute(req);

        if (savedArticleOrError.isFailure()) {
            return failureResponse([(savedArticleOrError.value as ErrorInfo).message])
        }

        return dataResponse(savedArticleOrError.value);
    }

    @MessagePattern('hello')
    async hello() {
        return "hello";
    }

    // @MessagePattern({ cmd: 'sum' })
    // accumulate(data: number[]): Observable<number> {
    //     return scheduled<number>([1, 2, 3], );
    // }

}