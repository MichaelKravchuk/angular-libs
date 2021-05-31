import { EventEmitter } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { BaseField } from '../base.field';
import { RandomHelper } from '../helpers';

import { ExtendedFormControl } from './extended-form-control';
import { ExtendedFormGroup } from './extended-form-group';

export class ExtendedFormArray extends FormArray {
    public static type = 'FormArray';

    public readonly controlAdded: EventEmitter<ExtendedFormGroup> = new EventEmitter();
    public readonly formFactory: (
        configs: BaseField[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) => ExtendedFormGroup;

    public id = RandomHelper.NumId;
    public controls: ExtendedFormControl[];
    public fieldConfig: any;
    public canAddRow: (() => boolean) | boolean = true;
    public defaultValuePatched: boolean;

    constructor(controls: AbstractControl[],
                validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
                formFactory?: (
                    configs: BaseField[],
                    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
                ) => ExtendedFormGroup
    ) {
        super(controls, validatorOrOpts, asyncValidator);
        this.formFactory = formFactory;
    }

    public get(path: Array<string | number> | string): ExtendedFormControl {
        return super.get(path) as ExtendedFormControl;
    }

    public get canShowError(): boolean {
        return this.invalid && (this.touched || this.dirty);
    }

    public patchValue(value: {
        [key: string]: any;
    }[], options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        addControls?: boolean;
    }): void {
        if (!Array.isArray(value)) {
            return;
        }

        if (options && options.addControls) {
            for (let i = this.controls.length; i < value.length; i++) {
                this.addControl();
            }
        }

        value.forEach(((newValue, index) => {
            if (this.at(index)) {
                this.at(index).patchValue(newValue, { ...options, onlySelf: true });
            }
        }));

        this.updateValueAndValidity(options);
    }

    public instantError(): string | null {
        // If no errors -> return `null`
        const errorsArray = Object.keys(this.errors || {});
        if (errorsArray.length < 1) {
            return null;
        }

        // Find first error that is presented in ErrorBook
        let actualErrorName = errorsArray.find((key) => !!this.getErrorMsgsByKey(key));

        if (!actualErrorName) {
            actualErrorName = errorsArray[0];
        }

        // Return value of error from ErrorBook
        // or actual error's value
        return this.getErrorMsgsByKey(actualErrorName) || this.getError(actualErrorName);
    }

    public get error(): Observable<string | null> {
        return merge(this.statusChanges, this.valueChanges)
            .pipe(
                startWith(undefined),
                map(() => this.instantError())
            );
    }

    public getErrorMsgsByKey(key: string): any {
        // const customError = this.fieldConfig.errorMsgs && this.fieldConfig.errorMsgs[key];
        // const error = customError || StandardErrorMsgs[key] || 'None';
        //
        // if (typeof error === 'function') {
        //   return error(this.errors[key]);
        // }

        // return error;
    }

    public addControl(canNotRemove?: boolean): any {

        if (!this.formFactory) {
            console.error('ExtendedFormArray required formFactory');
            return;
        }

        const control = this.formFactory(this.fieldConfig.configs);

        if (this.disabled) {
            control.disable({ emitEvent: false });
        }

        control.canRemove = !canNotRemove;
        this.push(control);
        this.controlAdded.emit(control);
        return control;
    }

    public enableAllControlByKey(key: string): void {
        this.controls.forEach(control => {
            control.get(key).enable();
        });
    }

    public removeAllControls(): void {
        while (this.controls.length !== 0) {
            this.removeAt(0);
        }
    }

    public touch(): void {
        this.markAsTouched();
        this.controls.forEach((control) => control.touch());
    }

    public validate(): boolean {
        this.touch();
        return this.valid;
    }

    public get isChangedByUser(): boolean {
        return this.defaultValuePatched && this.controls.some(control => control.isChangedByUser);
    }

    public patchDefaultValue(value: any): void {
        this.defaultValuePatched = true;
        if (!Array.isArray(value)) {
            return;
        }

        value.forEach(((newValue, index) => {
            const control: any = this.at(index);
            if (control) {
                control.patchDefaultValue(newValue);
            }
        }));
    }

    public resetDefaultValue(): void {
        this.defaultValuePatched = false;
        this.controls.forEach(control => control.resetDefaultValue());
    }

    public resetToDefaultValue(): void {
        this.controls.forEach(control => control.resetToDefaultValue());
    }
}
