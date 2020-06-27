import { Repository, EntityRepository, EntityManager } from "typeorm";
import { ArticleEntity } from "../domain/article.entity";
import { IRepository } from "../../../core/infra/IRepository";
import { Injectable } from "@nestjs/common";
import { Success, Result, Failure } from "../../../core/logic/Result";
import { OperationErrors, ErrorInfo } from "../../../core/logic/Errors";


@Injectable()
@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> implements IRepository<ArticleEntity> {

    async findTenBeforeId(id: number): Promise<Result<ArticleEntity[] | ErrorInfo >> {
        return Failure.out({
            type: OperationErrors.EntityFindError,
            message: `id: ${id}, timestamp: ${Date.now()}`
        });
    }

    async exists(article: ArticleEntity) {
        let entity: ArticleEntity;
        try {
            entity = await this.findOne(article.id);
            return Success.out(!!entity === true);
        } catch (error) {
            return Failure.out({ 
                type: OperationErrors.EntityFindError, 
                message: error
            })
        }
    }

    async saveArticle(article: ArticleEntity): Promise<Result<ArticleEntity | ErrorInfo>> {
        try{
            const savedEntity = await this.save(article);
            return Success.out(savedEntity);
        } catch (error) {
            return Failure.out({ 
                type: OperationErrors.EntityCreationError, 
                message: error
            })
        }
    }

    async deleteMany(articles: ArticleEntity[]) {
        return this.manager.transaction(async transactionManager => {
            articles.forEach(article => {
                transactionManager.softRemove(article);
            })
            return Success.out(articles);
        })
    }
}