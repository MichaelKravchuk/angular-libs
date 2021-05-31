import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CtDynamicFormModule } from '../../../../projects/ct-dynamic-form/src/lib/ct-dynamic-form.module';
import { CtDynamicFormComponent } from './ct-dynamic-form.component';
import { DYNAMIC_FORM_CONFIG } from './dynamic-form.config';
import { TextFieldComponent } from './fields';


@NgModule({
    declarations: [
        CtDynamicFormComponent,
        TextFieldComponent
    ],
    imports: [
        CommonModule,
        CtDynamicFormModule.config(DYNAMIC_FORM_CONFIG)
    ]
})
export class DynamicFormModuleModule {
}
