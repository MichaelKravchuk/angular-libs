import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreComponent} from './core.component';
import {CoreRoutingModule} from './core-routing.module';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatMenuModule, MatPaginatorModule, MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

import {
    HeaderLayoutComponent,
    SidenavComponent
} from './layouts';

import {AngularResizeElementComponent} from './angular-resize-element/angular-resize-element.component';
import {ResizedElementComponent} from './angular-resize-element/resized-element/resized-element.component';
import {AngularResizeElementModule} from '../../../projects/angular-resize-element/src/lib/angular-resize-element.module';

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
    ]
})
export class CoreModule { }
