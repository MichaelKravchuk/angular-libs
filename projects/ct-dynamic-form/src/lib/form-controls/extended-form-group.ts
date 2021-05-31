import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { BaseField } from '../base.field';
import { ExtendedFormControl } from './extended-form-control';


export class ExtendedFormGroup extends FormGroup {
    // public id = RandomHelper.NumId;

    public controls: { [key: string]: ExtendedFormControl };
    public fieldConfig: BaseField;
    public lastPatchedValue: { [key: string]: any };
    public canRemove = true;
    public defaultValuePatched: boolean;

    public get(path: Array<string | number> | string): ExtendedFormControl {
        return super.get(path) as ExtendedFormControl;
    }

    public patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        addControls?: boolean;
    }): void {
        this.lastPatchedValue = value;

        if (!(value === void 0)) {
            Object.keys(value).forEach((name) => {
                if (this.controls[name]) {
                    // @ts-ignore
                    this.controls[name].patchValue(
                        value[name],
                        { onlySelf: true, ...(options || {}) }
                    );
                }
            });

            this.updateValueAndValidity(options);
        }

        this.lastPatchedValue = null;
    }

    public get canShowError(): boolean {
        return this.invalid && (this.touched || this.dirty);
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
        const customError = this.fieldConfig.errorMsgs && this.fieldConfig.errorMsgs[key];
        // const error = customError || StandardErrorMsgs[key] || 'None';

        // if (typeof error === 'function') {
        //   return error(this.errors[key]);
        // }
        //
        // return error;
    }

    public touch(): void {
        this.markAsTouched();
        Object.values(this.controls)
            .forEach((control) => control.touch());
    }

    public validate(): boolean {
        this.touch();
        return !this.invalid;
    }

    public get isChangedByUser(): boolean {
        return this.defaultValuePatched && Object.values(this.controls).some((control) => control.isChangedByUser);
    }

    public patchDefaultValue(value: any): void {
        this.defaultValuePatched = true;
        if (!(value === void 0)) {
            Object.keys(value).forEach((name) => {
                if (this.controls[name]) {
                    // @ts-ignore
                    this.controls[name].patchDefaultValue(
                        value[name]
                    );
                }
            });
        }
    }

    public resetDefaultValue(): void {
        this.defaultValuePatched = false;
        Object.values(this.controls).forEach((control) => control.resetDefaultValue());
    }

    public resetToDefaultValue(): void {
        Object.values(this.controls).forEach(control => control.resetToDefaultValue());
    }

    public scrollToFirstError(correction: number = 0, targetForm = document): number | boolean {
        const errEl = targetForm.querySelector('.mat-error');

        if (!errEl) {
            return false;
        }

        return document.documentElement.scrollTop = document.documentElement.scrollTop + errEl.getBoundingClientRect().top + correction;
    }
}
