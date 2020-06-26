import { IsString, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class SourceDto {
    @IsString()
    id: string

    @IsString()
    name: string
}

export class CreateArticleRequestDto {
    @ValidateNested()
    source: SourceDto

    @IsString()
    author: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    content: string

    @IsString()
    url: string

    @IsString()
    urlToImage: string

    @IsString()
    publishedAt: string
}