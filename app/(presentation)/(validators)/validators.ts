export class Validator {
    public value: string = "";

    constructor(value: string) {
        this.value = value
    }
}

export interface IValidator {
    isValid: boolean;
    error?: {
        code: string;
        message: string;
    } | null;
}