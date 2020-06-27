import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class FetchArticlesRequestPipe implements 
    PipeTransform<string, Promise<number>>
{
    async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
        return parseInt(value);
    }
}