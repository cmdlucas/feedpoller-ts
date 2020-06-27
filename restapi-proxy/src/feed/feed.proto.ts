import { IsString, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class Source {
    id: string
    name: string
}

export class Article {
    source: Source
    author: string
    title: string
    description: string
    content: string
    url: string
    urlToImage: string
    publishedAt: string
}