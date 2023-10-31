import { IValidator, Validator } from "./validators";

export class BirthDateValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir la fecha" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}