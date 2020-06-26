export enum OperationErrors {
    InvalidDataTypeError,
    InvalidArgumentError,
    EntityCreationError,
    EntityFindError
}

export interface ErrorInfo {
    type: OperationErrors
    message: string
}