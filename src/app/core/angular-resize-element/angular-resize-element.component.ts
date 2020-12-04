import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {AngularResizeElementEvent, AngularResizeElementDirection} from '../../../../projects/angular-resize-element/src/public_api';

import {ResizedElementComponent} from './resized-element/resized-element.component';

@Component({
    selector: 'app-angular-resize-element',
    templateUrl: './angular-resize-element.component.html',
    styleUrls: ['./angular-resize-element.component.scss']
})
export class AngularResizeElementComponent implements AfterViewInit {
    public readonly AngularResizeElementDirection = AngularResizeElementDirection;
    public data: Array<{width: number, height: number, top: number, left: number}>;

    @ViewChildren(ResizedElementComponent, {read: ElementRef})
    public readonly resizedElementQueryList: QueryList<ElementRef>;

    public get containerElements(): Array<ElementRef> {
        return this.resizedElementQueryList ? this.resizedElementQueryList.toArray() : [];
    }

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
        this.data = Array(5).fill(null).map(() => ({width: null, height: null, top: null, left: null}));
    }

    public ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    public onResize(evt: AngularResizeElementEvent, data: any): void {
        data.width = evt.currentWidthValue;
        data.height = evt.currentHeightValue;
        data.top = evt.currentTopValue;
        data.left = evt.currentLeftValue;
    }
}
