import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularResizeElementComponent} from './angular-resize-element/angular-resize-element.component';
import {AngularResizeElementModule} from '../../projects/angular-resize-element/src/lib/angular-resize-element.module';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [
        AppComponent,
        AngularResizeElementComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularResizeElementModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
