import { ArticleRepository } from "../repository/article.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FetchArticlesService {
    constructor(private articlesRepository: ArticleRepository){}

    async fetchTenBeforeCursor(cursor: number) {
        return await this.articlesRepository.findTenBeforeId(cursor)
    }
}