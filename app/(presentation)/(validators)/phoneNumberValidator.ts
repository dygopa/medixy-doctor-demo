import { IValidator, Validator } from "./validators";

export class PhoneNumberValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su número de teléfono" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_min_length(min_length = 6): IValidator {
        if (this.value.trimEnd().length < min_length) {
            return { isValid: false, error: { code: "field-min-length", message: `El teléfono debe contener mínimo ${min_length} carácteres` } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_regexp(): IValidator {
        if (!/^\d+$/.test(this.value.trimEnd())) {
            return { isValid: false, error: { code: "field-invalid-format", message: "Debe escribir un teléfono válido" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}