import { ArticleRepository } from "../repository/article.repository";

export class FetchArticlesService {
    constructor(private articlesRepository: ArticleRepository){}

    async fetchTenBeforeCursor(cursor: number) {
        return await this.articlesRepository.findTenBeforeId(cursor)
    }
}