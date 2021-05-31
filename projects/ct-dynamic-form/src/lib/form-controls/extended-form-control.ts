import { FormControl } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { BaseField } from '../base.field';

export class ExtendedFormControl extends FormControl {
    private readonly subResetValueChange = new Subject<any>();
    // public id = RandomHelper.NumId;

    public fieldConfig: BaseField;
    public additionalValue?: any;
    public defaultValue: any = null;
    public defaultValuePatched: boolean;

    public get canShowError(): boolean {
        return this.invalid && (this.touched || this.dirty);
    }

    // public instantError(): string | null {
    //     // If no errors -> return `null`
    //     const errorsArray = Object.keys(this.errors || {});
    //     if (errorsArray.length < 1) {
    //         return null;
    //     }
    //
    //     // Find first error that is presented in ErrorBook
    //
    //     let actualErrorName = errorsArray.find((key) => !!this.getErrorMsgsByKey(key));
    //
    //     if (!actualErrorName) {
    //         actualErrorName = errorsArray[0];
    //     }
    //
    //     // Return value of error from ErrorBook
    //     // or actual error's value
    //     return this.getErrorMsgsByKey(actualErrorName) || this.getError(actualErrorName);
    // }

    // public get error(): Observable<string | null> {
    //     return merge(this.statusChanges, this.valueChanges)
    //         .pipe(
    //             startWith(undefined),
    //             map(() => this.instantError())
    //         );
    // }

    public get resetValueChange(): Observable<any> {
        return this.subResetValueChange.asObservable();
    }

    // public getErrorMsgsByKey(key: string): string {
    //   const customError = this.fieldConfig.errorMsgs && this.fieldConfig.errorMsgs[key];
    //   // const error = customError || StandardErrorMsgs[key] || 'None';
    //
    //   if (typeof error === 'function') {
    //     return error(this.errors[key]);
    //   }
    //
    //   return error;
    // }

    public touch(): void {
        this.markAsTouched();
        this.updateValueAndValidity();
    }

    public validate(): boolean {
        this.touch();
        return this.valid;
    }

    public get isChangedByUser(): boolean {
        return this.defaultValuePatched && !(this.defaultValue === this.value || (this.defaultValue === null && this.value === ''));
    }

    public patchDefaultValue(value: any): void {
        this.defaultValue = value;
        this.defaultValuePatched = true;
    }

    public resetDefaultValue(): void {
        this.defaultValue = undefined;
        this.defaultValuePatched = false;
    }

    public resetToDefaultValue(): void {
        this.patchValue(this.defaultValue, { emitEvent: true, onlySelf: true });
        this.subResetValueChange.next(this.defaultValue);
    }
}
