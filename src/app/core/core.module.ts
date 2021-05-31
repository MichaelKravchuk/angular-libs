import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { AngularResizeElementModule } from '../../../projects/angular-resize-element/src/lib/angular-resize-element.module';
import { CtDynamicFormModule } from '../../../projects/ct-dynamic-form/src/lib/ct-dynamic-form.module';

import { AngularResizeElementComponent } from './angular-resize-element/angular-resize-element.component';
import { ResizedElementComponent } from './angular-resize-element/resized-element/resized-element.component';
import { CoreRoutingModule } from './core-routing.module';

import { CoreComponent } from './core.component';
import { DynamicFormModuleModule } from './ct-dynamic-form/dynamic-form-module.module';

import { HeaderLayoutComponent, SidenavComponent } from './layouts';

@NgModule({
    declarations: [
        CoreComponent,
        AngularResizeElementComponent,
        ResizedElementComponent,
        HeaderLayoutComponent,
        SidenavComponent,
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatPaginatorModule,
        AngularResizeElementModule,
        CtDynamicFormModule,
        DynamicFormModuleModule
    ],
    providers: []
})
export class CoreModule {
}
