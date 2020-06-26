import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, EntityManager } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
    
    equals(entity: BaseEntity) {
        return this.id === entity.id;
    }
}