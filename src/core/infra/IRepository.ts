import { Result } from "../logic/Result";

export interface IRepository<T> {
    exists(item: T): Promise<any>;
}