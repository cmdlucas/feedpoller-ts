import { ArticleRepository } from "../repository/article.repository";
import { Injectable } from "@nestjs/common";
import { Success } from "../../../core/logic/Result";
import { FetchArticleResponseDto } from "../dto/FetchArticleResponse.dto";
import ArticleEntity from "../domain/article.entity";

@Injectable()
export class FetchArticlesService {
    constructor(private articlesRepository: ArticleRepository){}

    async fetchTenBeforeCursor(cursor: number) {
        const tenArticlesOrError = await this.articlesRepository.findTenBeforeId(cursor)
        if(tenArticlesOrError.isFailure()) return tenArticlesOrError;

        const articles = (tenArticlesOrError.value as ArticleEntity[]).map(articleEntity => {
            return FetchArticleResponseDto.from(articleEntity);
        })

        return Success.out(articles);
    }
}