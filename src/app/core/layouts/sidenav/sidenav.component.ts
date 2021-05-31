import {Component, Input} from '@angular/core';
import {RoutingContract} from '@shared/constans';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    public readonly RoutingContract = RoutingContract;
    public readonly title = 'Angular libs';

    @Input()
    public drawer: MatDrawer;
}
