import { Module, Global } from '@nestjs/common'
import { ArticleRepository } from './repository/article.repository';
import { EntityManager, getManager } from 'typeorm';
import { CreateArticleService } from './service/createarticle.service';
import { ArticleController } from './controller/article.controller';
import { FetchArticlesService } from './service/fetcharticles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArticleEntity from './domain/article.entity';

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([ArticleEntity]) 
    ],
    providers: [
        ArticleRepository, CreateArticleService, FetchArticlesService
    ],
    controllers: [ArticleController]
})
export class ArticleModule {}