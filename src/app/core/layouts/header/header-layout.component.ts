import {Component, Input} from '@angular/core';
import {MatDrawer} from '@angular/material';

@Component({
    selector: 'header-layout',
    templateUrl: './header-layout.component.html',
    styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent {
    @Input()
    public drawer: MatDrawer;
}
