import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn } from "typeorm"
import { BaseEntity } from "../../../core/domain/base.entity";
import { ArticleEntity } from "./article.entity";
import { SourceVO } from "./source.vo";
import { Success } from "../../../core/logic/Result";

@Entity()
export class SourceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    source_id: string

    @OneToMany(type => ArticleEntity, article => article.source)
    @JoinColumn()
    article: ArticleEntity

    static async create(sourceVO: SourceVO) {
        const sourceEntity = new SourceEntity();
        sourceEntity.source_id = sourceVO.id;
        sourceEntity.name = sourceVO.name;
        // business logic validation comes here
        return Success.out(sourceEntity);
    }
}

export default SourceEntity;