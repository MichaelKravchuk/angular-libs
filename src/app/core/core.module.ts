import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
