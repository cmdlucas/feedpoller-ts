type Status = "success" | "failure";

export interface ApiControllerResponse {
    readonly status: Status
}

export interface SuccessResponse<T> extends ApiControllerResponse {
    readonly data: T
}

export interface FailureResponse extends ApiControllerResponse {
    readonly reasons: string[]
}

export const failureResponse = (reasons: Array<string>): FailureResponse => ({
    status: "failure",
    reasons: reasons
})

export const dataResponse = (data: any): SuccessResponse<any> => ({
    status: "success",
    data: data
})