import { Failure, Success } from "../../../core/logic/Result";
import { IsString, validate } from "class-validator";
import { OperationErrors } from "../../../core/logic/Errors";

/**
 * An object representation of a Source
 */
export interface ISourceVO {
    id: string
    name: string
}

/**
 * An object representation of an Source
 */
export class SourceVO {
    readonly id: string

    @IsString()
    readonly name: string

    private constructor(sourceData: ISourceVO) {
        this.id = sourceData.id ?? "";
        this.name = sourceData.name;
        Object.freeze(this);
    }

    /**
     * Create and validate an source value object
     * Here we validate properties and their types
     * @param sourceData 
     */
    static async create(sourceData: ISourceVO) {
        const sourceVO = new SourceVO(sourceData);

        const sourceValidated = await validate(sourceVO);

        if(sourceValidated.length > 0) {
            return Failure.out({
                type: OperationErrors.InvalidDataTypeError,
                message: "Please verify that the right data types are provided for the source"
            });
        }

        return Success.out(sourceVO);
    }
}