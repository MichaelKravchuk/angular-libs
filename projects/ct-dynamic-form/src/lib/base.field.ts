import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ExtendedFormArray, ExtendedFormControl, ExtendedFormGroup } from './form-controls';
import { BaseFieldInterface, RelatedFieldInterface } from './interfaces/field-config.interface';

interface NewFormControl {
    new (...params: any): ExtendedFormControl | ExtendedFormArray | ExtendedFormGroup
}


export class BaseField implements BaseFieldInterface {
    public formControl: NewFormControl = ExtendedFormControl;
    public validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    public asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
    public key: string;
    public label: string;
    public order: number;
    public internalOrder: number;
    public initialValue?: any;
    public errorMsgs?: { [key: string]: string };
    public ignore?: boolean;
    public className?: string | string[];
    public relatedFields?: RelatedFieldInterface[];

    constructor(options: BaseFieldInterface) {
        this.validatorOrOpts = options.validatorOrOpts;
        this.asyncValidator = options.asyncValidator;
        this.key = options.key;
        this.label = options.label;
        this.order = options.order;
        this.initialValue = options.initialValue;
        this.errorMsgs = options.errorMsgs;
        this.relatedFields = options.relatedFields;
        this.ignore = options.ignore;

        if (options.className) {
            this.className = Array.isArray(options.className) ? options.className : [options.className];
        } else {
            this.className = ['fxb-100'];
        }
    }
}
