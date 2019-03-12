import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularResizeElementEvent} from '../../../projects/angular-resize-element/src/lib/angular-resize-element-event.interface';
import {AngularResizeElementDirection} from '../../../projects/angular-resize-element/src/lib/angular-resize-element.enum';

@Component({
    selector: 'app-angular-resize-element',
    templateUrl: './angular-resize-element.component.html',
    styleUrls: ['./angular-resize-element.component.scss']
})
export class AngularResizeElementComponent implements OnInit {
    public readonly AngularResizeElementDirection = AngularResizeElementDirection;
    public data: any = {};
    public toggle: boolean;

    @ViewChild('container', {read: ElementRef})
    public readonly containerElement;

    public onResize(evt: AngularResizeElementEvent): void {
        this.data.width = evt.currentWidthValue;
        this.data.height = evt.currentHeightValue;
    }

    public ngOnInit(): void {
        console.log(this.containerElement);
    }
}
