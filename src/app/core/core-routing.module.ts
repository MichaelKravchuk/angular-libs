import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticRoutingContract } from '@shared/constans';
import { AngularResizeElementComponent } from './angular-resize-element/angular-resize-element.component';

import { CoreComponent } from './core.component';
import { CtDynamicFormComponent } from './ct-dynamic-form/ct-dynamic-form.component';
import { SpringSliderComponent } from './spring-slider/spring-slider.component';

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
            },
            {
                path: StaticRoutingContract.Core.SPRING_SLIDER,
                component: SpringSliderComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
