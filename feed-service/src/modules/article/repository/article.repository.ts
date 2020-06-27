import { Repository, EntityRepository, EntityManager } from "typeorm";
import { ArticleEntity } from "../domain/article.entity";
import { IRepository } from "../../../core/infra/IRepository";
import { Injectable, Logger } from "@nestjs/common";
import { Success, Result, Failure } from "../../../core/logic/Result";
import { OperationErrors, ErrorInfo } from "../../../core/logic/Errors";
import { InjectRepository } from "@nestjs/typeorm";

const logger = new Logger('ArticleRepository');

@Injectable()
@EntityRepository(ArticleEntity)
export class ArticleRepository implements IRepository<ArticleEntity> {

    constructor(@InjectRepository(ArticleEntity) private repo: Repository<ArticleEntity>){}

    async findTenBeforeId(id: number): Promise<Result<ArticleEntity[] | ErrorInfo >> {
        return Failure.out({
            type: OperationErrors.EntityFindError,
            message: `id: ${id}, timestamp: ${Date.now()}`
        });
    }

    async exists(article: ArticleEntity) {
        let entity: ArticleEntity;
        try {
            entity = await this.repo.findOne(article.id);
            return Success.out(!!entity === true);
        } catch (error) {
            return Failure.out({ 
                type: OperationErrors.EntityFindError, 
                message: `ArticleRepository: ${error.message}`
            })
        }
    }

    async saveArticle(article: ArticleEntity): Promise<Result<ArticleEntity | ErrorInfo>> {
        try{
            const savedEntity = await this.repo.save(article);
            return Success.out(savedEntity);
        } catch (error) {
            return Failure.out({ 
                type: OperationErrors.EntityCreationError, 
                message: `ArticleRepository: ${error.message}`
            })
        }
    }

    async deleteMany(articles: ArticleEntity[]) {
        return this.repo.manager.transaction(async transactionManager => {
            articles.forEach(article => {
                transactionManager.softRemove(article);
            })
            return Success.out(articles);
        })
    }
}