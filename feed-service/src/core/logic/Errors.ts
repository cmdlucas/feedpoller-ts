export enum OperationErrors {
    InvalidDataTypeError = "InvalidDataTypeError",
    InvalidArgumentError = "InvalidArgumentError",
    EntityCreationError = "EntityCreationError",
    EntityFindError = "EntityFindError"
}

export interface ErrorInfo {
    type: OperationErrors
    message: string
}