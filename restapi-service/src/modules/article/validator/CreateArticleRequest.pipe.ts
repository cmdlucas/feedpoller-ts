import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { CreateArticleRequestDto, SourceDto } from "../dto/createarticlerequest.dto";
import { validate } from "class-validator";

export class CreateArticleRequestPipe implements 
    PipeTransform<CreateArticleRequestDto, Promise<CreateArticleRequestDto>>
{
    async transform(value: CreateArticleRequestDto, metadata: ArgumentMetadata): Promise<CreateArticleRequestDto> {
        const sourceDto = new SourceDto();
        sourceDto.id = value.source.id;
        sourceDto.name = value.source.name;

        // necessary to allow the validator work on the nested object
        value.source = sourceDto;

        const validationErrors = await validate(value);

        if(validationErrors.length > 0) {
            throw new Error("There is something wrong with the data you supplied")
        }

        return value;
    }
}