import {
    AbstractControl,
    AbstractControlOptions,
    AsyncValidatorFn,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn
} from '@angular/forms';
import { of } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { BaseField } from './base.field';
import { ExtendedFormGroup } from './form-controls';
import { RelatedFieldInterface } from './interfaces/field-config.interface';


export function createDynamicForm(
    configs: BaseField[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
): ExtendedFormGroup {
    const form = new ExtendedFormGroup({}, validatorOrOpts, asyncValidator);

    configs.forEach((config, index) => {
        const control = debouncer(config, index);
        form.registerControl(config.key, control);
        postProcess(control, config);
    });

    return form;
}

function createFormControl(config: BaseField): AbstractControl {
    return Reflect.construct(config.formControl, [
        config.initialValue,
        config.validatorOrOpts,
        config.asyncValidator,
    ]);
}


function createFormGroupControl(config: BaseField): AbstractControl {
    const controls: { [key: string]: AbstractControl } = {};

    // configs.forEach((config, orderIndex) => {
    //
    // });

    return controls as any;
}

function createFormArrayControl(config: BaseField): AbstractControl {
    const controls: { [key: string]: AbstractControl } = {};

    // configs.forEach((config, orderIndex) => {
    //
    // });

    return controls as any;
}


function debouncer(config: BaseField, index: number): AbstractControl {
    const formControlPrototype = config.formControl.prototype;

    if (formControlPrototype instanceof FormControl) {
        return createFormControl(config);
    } else if (formControlPrototype instanceof FormGroup) {
        return createFormGroupControl(config);
    } else if (formControlPrototype instanceof FormArray) {
        return createFormArrayControl(config);
    }
}


function postProcess(control: AbstractControl & any, config: BaseField): void {
    control.fieldConfig = config;

    if (!config.relatedFields) {
        return;
    }

    const initValueStr = config.initialValue instanceof Object ? config.initialValue.value : config.initialValue;

    of(of(initValueStr), control.valueChanges).pipe(
        mergeAll()
    ).subscribe(() => {
        const shouldBeDeletedItems = [];
        const shouldBeAddedItems = [];

        config.relatedFields.forEach((relatedField, index) => {
            let relatedFieldConfig = relatedField.configs;

            if (typeof relatedField.configs === 'function') {
                relatedFieldConfig = relatedField.configs(control.value, control);
            }

            if (controlIsVisible(relatedField, control)) {
                shouldBeAddedItems.push({ configs: relatedFieldConfig, index });
            } else {
                shouldBeDeletedItems.push({ configs: relatedFieldConfig, index });
            }
        });

        shouldBeDeletedItems.forEach(item => {
            removeControls(item.configs, control.parent);
        });

        shouldBeAddedItems.forEach((item) => {
            item.configs.forEach((childConfig, i) => {
                const childControl = debouncer(childConfig, i);
                control.parent.registerControl(childConfig.key, childControl);
                postProcess(childControl, childConfig);
            });
        });
    });
}


function removeControls(configs: Array<BaseField>, form: ExtendedFormGroup): void {
    // if (!form.lastPatchedValue) {
    //     form.lastPatchedValue = {};
    // }
    configs
        .filter(config => form.get(config.key))
        .forEach(config => {
            // const control: any = form.get(config.key);
            // // form.lastPatchedValue[config.key] = control.getRawValue ? control.getRawValue() : control.value;
            form.removeControl(config.key);

            if (config.relatedFields) {
                config.relatedFields.forEach((c: any) => {
                    removeControls(c.configs, form);
                });
            }
        });
}


function controlIsVisible(config: RelatedFieldInterface, control: AbstractControl): boolean {
    const controlValue = control.value;

    switch (typeof config.checkVisibility) {
        case 'boolean':
        case 'string':
        case 'number': {
            return controlValue === config.checkVisibility;
        }
        case 'function': {
            // @ts-ignore
            return config.checkVisibility(controlValue, control);
        }
        case 'object': {
            if (Array.isArray(config.checkVisibility)) {
                return config.checkVisibility
                    .some(item => item === controlValue);
            }
        }
    }
}
