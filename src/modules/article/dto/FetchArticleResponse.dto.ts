import { ArticleEntity } from "../domain/article.entity";

export class FetchArticleResponseDto {
    readonly source: {
        id: string
        name: string
    };
    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly content: string;
    readonly url: string;
    readonly urlToImage: string;
    readonly publishedAt: Date;

    private constructor(article: ArticleEntity) {
        this.source = { id: article.source.source_id, name: article.source.name };
        this.author = article.author.name;
        this.title = article.title;
        this.description = article.description;
        this.content = article.content;
        this.url = article.url;
        this.urlToImage = article.urlToImage;
        this.publishedAt = article.publishedAt;
        Object.freeze(this);
    }

    static from(article: ArticleEntity) {
        return new this(article);
    }
}