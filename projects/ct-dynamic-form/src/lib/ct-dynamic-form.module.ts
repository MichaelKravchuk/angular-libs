import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CtDynamicFormComponent } from './ct-dynamic-form.component';
import { DynamicFormConfig } from './dynamic-form.config';

export const config: InjectionToken<string> = new InjectionToken('dynamicForm');


@NgModule({
    declarations: [CtDynamicFormComponent],
    imports: [],
    exports: [CtDynamicFormComponent]
})
export class CtDynamicFormModule {
    public static config(dynamicFormConfig: DynamicFormConfig): ModuleWithProviders<CtDynamicFormModule> {
        return {
            ngModule: CtDynamicFormModule,
            providers: [{ provide: config, useValue: dynamicFormConfig }]
        };
    }
}
