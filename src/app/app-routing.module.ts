import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaticRoutingContract} from '@shared/constans';

import {AngularResizeElementComponent} from './angular-resize-element/angular-resize-element.component';

const routes: Routes = [
    {
        path: StaticRoutingContract.RESIZE_ELEMENT,
        component: AngularResizeElementComponent
    },
    {
        path: '**',
        redirectTo: StaticRoutingContract.RESIZE_ELEMENT,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
