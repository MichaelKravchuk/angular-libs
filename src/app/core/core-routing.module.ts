import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaticRoutingContract} from '@shared/constans';

import {CoreComponent} from './core.component';
import {AngularResizeElementComponent} from './angular-resize-element/angular-resize-element.component';

const routes: Routes = [
    {
        path: '',
        component: CoreComponent,
        children: [
            {
                path: '',
                redirectTo: StaticRoutingContract.Core.RESIZE_ELEMENT,
                pathMatch: 'full'
            },
            {
                path: StaticRoutingContract.Core.RESIZE_ELEMENT,
                component: AngularResizeElementComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
