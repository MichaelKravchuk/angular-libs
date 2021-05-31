import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaticRoutingContract} from '@shared/constans';

const routes: Routes = [
    {
        path: StaticRoutingContract.Core.ROOT,
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        data: {preload: true, delay: 500}
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
