import { IValidator, Validator } from "./validators";

export class EmailValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su correo electrónico" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_min_length(): IValidator {
        if (this.value.trimEnd().length < 6) {
            return { isValid: false, error: { code: "field-min-length", message: "El correo debe contener mínimo 6 carácteres" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_regexp(): IValidator {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value.trimEnd())) {
            return { isValid: false, error: { code: "field-invalid-format", message: "Debe escribir un correo electrónico válido" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}