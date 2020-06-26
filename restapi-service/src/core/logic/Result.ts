import { ErrorInfo } from "./Errors";

export interface Result<T> {
    readonly value: T
    isSuccess(): boolean
    isFailure(): boolean
}

export class Success<D> implements Result<D> {
    readonly value: D;

    private constructor(data: D) {
        this.value = data;
        Object.freeze(this);
    }

    isSuccess(): this is Success<D> {
        return true;
    }

    isFailure(): this is Failure<D> {
        return false;
    }

    static out<T>(data: T): Result<T> {
        return new this<T>(data);
    }
}

export class Failure<T> {
    readonly value: T;

    private constructor(error: T) {
        this.value = error;
        Object.freeze(this);
    }

    isSuccess() {
        return false;
    }

    isFailure() {
        return true;
    }

    static out(info: ErrorInfo): Result<ErrorInfo> {
        return new this({ ...info });
    }
}