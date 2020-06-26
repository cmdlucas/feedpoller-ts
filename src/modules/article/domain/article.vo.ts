import { SourceVO } from "./source.vo";
import { AuthorVO } from "./author.vo";
import { validate, IsString, IsDateString, IsDate } from "class-validator";
import { Failure, Success } from "../../../core/logic/Result";
import { OperationErrors } from "../../../core/logic/Errors";

/**
 * An object representation of an Article
 */
export interface IArticleVO {
    title: string
    description: string
    content: string
    url: string
    urlToImage: string
    publishedAt: string
}

export class ArticleVO {
    @IsString()
    readonly title: string

    @IsString()
    readonly description: string

    @IsString()
    readonly content: string

    @IsString()
    readonly url: string

    @IsString()
    readonly urlToImage: string

    @IsString()
    readonly publishedAt: string

    private constructor(articleData: IArticleVO){
        this.title = articleData.title;
        this.description = articleData.description;
        this.content = articleData.content;
        this.url = articleData.url;
        this.urlToImage = articleData.urlToImage;
        this.publishedAt = articleData.publishedAt;
        Object.freeze(this);
    }

    /**
     * Create and validate an article value object
     * Here we validate properties and their types
     * @param authorData 
     */
    static async create(articleData: IArticleVO) {
        const articleVO = new ArticleVO(articleData);

        const articleValidated = await validate(articleVO);

        if(articleValidated.length > 0) {
            return Failure.out({
                type: OperationErrors.InvalidDataTypeError, 
                message: "Create Error: Please verify that the right data types are provided for the article"
            });
        }

        return Success.out(articleVO);
    }
}

