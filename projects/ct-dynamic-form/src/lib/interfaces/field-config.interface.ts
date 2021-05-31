import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface AbstractFieldInterface {
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  key: string;
  order?: number;
  internalOrder?: number;
  initialValue?: any;
  errorMsgs?: { [key: string]: string };
  ignore?: boolean;
  className?: string | string[];
  relatedFields?: RelatedFieldInterface[];
}

export interface BaseFieldInterface extends AbstractFieldInterface {
  label: string;
}

export interface RelatedFieldInterface {
  configs: BaseFieldInterface[] | RelatedFieldsConfigFunction;
  checkVisibility: RelatedFieldsCheckVisibilityFunction | string | number | boolean | Array<string & number>;
}

type RelatedFieldsCheckVisibilityFunction = (value, control: AbstractControl) => boolean;
type RelatedFieldsConfigFunction = (value: any, control: AbstractControl) => BaseFieldInterface[];

export interface FieldOption {
  label: string;
  value: any;
  additionalValue?: any;
}

export interface FieldOptionG<T> {
  label: string;
  value: T;
  additionalValue?: any;
}

