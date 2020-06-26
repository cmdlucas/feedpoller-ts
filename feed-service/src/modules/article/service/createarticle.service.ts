import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../repository/article.repository";
import { CreateArticleRequestDto } from "../dto/createarticlerequest.dto";
import { IService } from "../../../core/infra/IService";
import { Result, Success, Failure } from "../../../core/logic/Result";
import { AuthorVO } from "../domain/author.vo";
import { ArticleVO } from "../domain/article.vo";
import { SourceVO } from "../domain/source.vo";
import ArticleEntity from "../domain/article.entity";
import AuthorEntity from "../domain/author.entity";
import SourceEntity from "../domain/source.entity";
import { OperationErrors } from "../../../core/logic/Errors";


export interface ICreateArticleService<Input, Output> extends IService<Input, Output> {}

@Injectable()
export class CreateArticleService implements 
    ICreateArticleService<CreateArticleRequestDto, Promise<Result<any>>>
{
    constructor(private articleRepository: ArticleRepository) {}

    private async getAuthorVO(articleDto: CreateArticleRequestDto) {
        return await AuthorVO.create({ name: articleDto.author });
    }

    private async getSourceVO(articleDto: CreateArticleRequestDto) {        
       return await SourceVO.create({ id: articleDto.source.id, name: articleDto.source.name });
    }
    
    private async getArticleVO(articleDto: CreateArticleRequestDto) {
        return await ArticleVO.create({
            title: articleDto.title, description: articleDto.description, url: articleDto.url,
            urlToImage: articleDto.urlToImage, publishedAt: articleDto.publishedAt, content: articleDto.content
        });
    }

    private async getArticleEntity(articleDto: CreateArticleRequestDto) {
        const authorVO = await this.getAuthorVO(articleDto);
        if(authorVO.isFailure()) return authorVO;

        const sourceVO = await this.getSourceVO(articleDto);
        if(sourceVO.isFailure()) return sourceVO;

        const articleVO = await this.getArticleVO(articleDto);
        if(articleVO.isFailure()) return articleVO;

        return await ArticleEntity.create(
            articleVO.value as ArticleVO, authorVO.value as AuthorVO, sourceVO.value as SourceVO);
    }

    async execute(articleDto: CreateArticleRequestDto)
    {
        const articleEntityOrError = await this.getArticleEntity(articleDto);
        if(articleEntityOrError.isFailure()) return articleEntityOrError;
        
        const savedArticleEntity = await this.articleRepository.saveArticle(
            articleEntityOrError.value as ArticleEntity);
        if(savedArticleEntity.isFailure()) return savedArticleEntity;

        return Success.out((savedArticleEntity.value as ArticleEntity).id);
    }
}