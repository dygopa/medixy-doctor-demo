import { IValidator, Validator } from "./validators";

export class PasswordValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su contraseña" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_min_length(): IValidator {
        if (this.value.trimEnd().length < 6) {
            return { isValid: false, error: { code: "field-min-length", message: "La contraseña debe contener mínimo 6 carácteres" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}