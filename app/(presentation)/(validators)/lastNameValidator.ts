import { IValidator, Validator } from "./validators";

export class LastNameValidator extends Validator {
    validate_not_empty(): IValidator {
        if (this.value.trimEnd().length === 0) {
            return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su apellido" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_max_length(max_length = 60): IValidator {
        if (this.value.trimEnd().length > max_length) {
            return { isValid: false, error: { code: "field-min-length", message: `El apellido debe contener máximo ${max_length} carácteres` } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 

    validate_regexp(): IValidator {
        if (!/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ''.\-]+$/.test(this.value.trimEnd())) {
            return { isValid: false, error: { code: "field-invalid-format", message: "El apellido debe contener solo letras, puntos o comillas simples" } } as IValidator;
        }

        return { isValid: true } as IValidator;
    } 
}