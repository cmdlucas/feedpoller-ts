import { Module, Global } from '@nestjs/common'
import { ArticleRepository } from './repository/article.repository';
import { EntityManager, getManager } from 'typeorm';
import { CreateArticleService } from './service/createarticle.service';
import { ArticleController } from './controller/article.controller';

/**
 * NB: Instead of using TypeOrmModule.forFeature() we supply our own Repository provider
 * This is simply because the former gives us a TypeOrm default wrapper of any specified entity
 */
@Global()
@Module({
    providers: [
        ArticleRepository, CreateArticleService,
        {
            provide: EntityManager,
            useFactory: () => getManager(),
        }
    ],
    controllers: [ArticleController]
})
export class ArticleModule {

}