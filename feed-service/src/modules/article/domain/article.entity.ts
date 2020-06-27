import SourceEntity from './source.entity';
import AuthorEntity from './author.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/domain/base.entity';
import { ArticleVO } from './article.vo';
import { Success } from '../../../core/logic/Result';
import { AuthorVO } from './author.vo';
import { SourceVO } from './source.vo';

@Entity('articles')
export class ArticleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => SourceEntity, source => source.article)
    source: SourceEntity

    @ManyToOne(type => AuthorEntity, author => author.article)
    author: AuthorEntity
    
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    url: string

    @Column()
    urlToImage: string

    @Column({
        type: "varchar",
        length: 25
    })
    publishedAt: string

    @Column({
        type: "longtext"
    })
    content: string
    
    static async getAuthorEntity(authorVO: AuthorVO) {
        const authorEntity = await AuthorEntity.create(authorVO);
        if(authorEntity.isFailure()) return authorEntity;
        return authorEntity
    }

    static async getSourceEntity(sourceVO: SourceVO) {  
        const sourceEntity = await SourceEntity.create(sourceVO);
        if(sourceEntity.isFailure()) return sourceEntity;
        return sourceEntity;
    }

    static async create(articleVO: ArticleVO, authorVO: AuthorVO, sourceVO: SourceVO) {
        const authorEntity = await this.getAuthorEntity(authorVO);
        if(authorEntity.isFailure()) return authorEntity;
        
        const sourceEntity = await this.getSourceEntity(sourceVO);
        if(sourceEntity.isFailure()) return sourceEntity;
        
        const articleEntity = new ArticleEntity();
        articleEntity.author = authorEntity.value as AuthorEntity;
        articleEntity.source = sourceEntity.value as SourceEntity;
        articleEntity.title = articleVO.title;
        articleEntity.description = articleVO.description;
        articleEntity.content = articleVO.content;
        articleEntity.url = articleVO.url;
        articleEntity.urlToImage = articleVO.urlToImage;
        articleEntity.publishedAt = articleVO.publishedAt;
        // business logic validation comes here
        return Success.out(articleEntity);
    }
}

export default ArticleEntity;