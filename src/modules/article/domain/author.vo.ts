import { validate, IsString } from "class-validator";
import { Failure, Success } from "../../../core/logic/Result";
import { OperationErrors } from "../../../core/logic/Errors";

export interface IAuthorVO {
    name: string
}

/**
 * An author value object
 */
export class AuthorVO {
    @IsString()
    readonly name: string

    private constructor(authorData: IAuthorVO){
        this.name = authorData.name;
        Object.freeze(this);
    }

    /**
     * Create and validate an author value object
     * Here we validate properties and their types
     * @param authorData 
     */
    static async create(authorData: IAuthorVO) {
        const authorVO = new AuthorVO(authorData)

        const authorValidated = await validate(authorVO);

        if(authorValidated.length > 0) {
            return Failure.out({
                type: OperationErrors.InvalidDataTypeError, 
                message: "Create Error: Please verify that the right data types are provided for the author"
            });
        }

        return Success.out(authorVO);
    }
}