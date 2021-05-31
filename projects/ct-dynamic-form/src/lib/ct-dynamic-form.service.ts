import { Injectable, InjectionToken, Injector, Optional } from '@angular/core';
// import { ExtendedFormGroup } from './form-controls';

const BASE_URL = new InjectionToken <string>('BaseUrl');

@Injectable({
    providedIn: 'root'
})
export class CtDynamicFormService {
    public static providedField(component, config): void {

    }

    constructor(
        @Optional() private readonly baseUrl: any
    ) {
    }
}
