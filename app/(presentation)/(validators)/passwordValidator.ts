import { IValidator, Validator } from "./validators";

export class PasswordValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su contraseña" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_min_length(min_length = 6): IValidator {
        if (this.value.trimEnd().length < min_length) {
            return { isValid: false, error: { code: "field-min-length", message: `La contraseña debe contener mínimo ${min_length} carácteres` } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}