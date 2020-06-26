import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn } from "typeorm"
import { ArticleEntity } from "./article.entity";
import { BaseEntity } from "../../../core/domain/base.entity";
import { AuthorVO } from "./author.vo";
import { Success } from "../../../core/logic/Result";

@Entity()
export class AuthorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(type => ArticleEntity, article => article.author)
    @JoinColumn()
    article: ArticleEntity

    static async create(authorVO: AuthorVO) {
        const authorEntity = new AuthorEntity();
        authorEntity.name = authorVO.name;
        // business logic validation comes here
        return Success.out(authorEntity)
    }
}

export default AuthorEntity;