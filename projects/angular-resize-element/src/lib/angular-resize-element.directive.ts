import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    Renderer2,
} from '@angular/core';
import {AngularResizeElementEvent} from './angular-resize-element-event.interface';
import {AngularResizeElementDirection} from './angular-resize-element.enum';

// @ts-ignore
@Directive({
    selector: '[resize], [resizeStart], [resizeEnd]'
})
export class AngularResizeElementDirective {
    private mouseUpListener: () => void;
    private mouseMoveListener: () => void;

    private targetElementWidthValue: number;
    private targetElementHeightValue: number;

    private originalEvent: MouseEvent;

    @Input()
    public targetElement: HTMLElement | ElementRef;

    @Input()
    public direction: AngularResizeElementDirection;

    @Input()
    public proportionalResize: boolean;

    @Input()
    public applyClass = 'resizes';

    @Output()
    public resizeStart: EventEmitter<AngularResizeElementEvent> = new EventEmitter();

    @Output()
    public resize: EventEmitter<AngularResizeElementEvent> = new EventEmitter();

    @Output()
    public resizeEnd: EventEmitter<AngularResizeElementEvent> = new EventEmitter();



    constructor(private readonly elementRef: ElementRef,
                private readonly renderer2: Renderer2,
    ) {}



    @HostListener('mousedown', ['$event'])
    private onMouseDown(evt: MouseEvent): void {
        evt.preventDefault();

        this.setOriginalData(evt);

        this.resizeStart.emit(this.generateValuesForEvent(evt));

        this.mouseUpListener = this.renderer2.listen('document', 'mouseup', event => this.onMouseUp(event));
        this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', event => this.onMouseMove(event));
        this.renderer2.addClass(this.elementRef.nativeElement, 'resizes');
    }



    private onMouseUp(evt: MouseEvent): void {
        this.resize.emit(this.generateValuesForEvent(evt));

        this.mouseMoveListener();
        this.mouseUpListener();

        this.renderer2.removeClass(this.elementRef.nativeElement, this.applyClass);
    }



    private onMouseMove(evt: MouseEvent): void {
        this.resize.emit(this.generateValuesForEvent(evt));
    }



    private setOriginalData(originalEvent: MouseEvent) {
        this.originalEvent = originalEvent;

        if (this.targetElement) {
            if (this.targetElement instanceof ElementRef) {
                this.targetElementWidthValue = this.targetElement.nativeElement.offsetWidth;
                this.targetElementHeightValue = this.targetElement.nativeElement.offsetHeight;
            } else {
                this.targetElementWidthValue = this.targetElement.offsetWidth;
                this.targetElementHeightValue = this.targetElement.offsetHeight;
            }
        } else {
            this.targetElementWidthValue = 0;
            this.targetElementHeightValue = 0;
        }
    }



    private generateValuesForEvent(evt: MouseEvent): AngularResizeElementEvent {
        const originalXValue = this.originalEvent.clientX;
        const originalYValue = this.originalEvent.clientY;

        let currentWidthValue = evt.clientX - originalXValue;
        let currentHeightValue = evt.clientY - originalYValue;

        switch (this.direction) {
            case AngularResizeElementDirection.TOP: {
                currentHeightValue *= -1;
                break;
            }
            case AngularResizeElementDirection.TOP_RIGHT: {
                currentHeightValue *= -1;
                break;
            }
            case AngularResizeElementDirection.RIGHT: { break; }
            case AngularResizeElementDirection.BOTTOM_RIGHT: { break; }
            case AngularResizeElementDirection.BOTTOM: { break; }
            case AngularResizeElementDirection.BOTTOM_LEFT: {
                currentWidthValue *= -1;
                break;
            }
            case AngularResizeElementDirection.LEFT: {
                currentWidthValue *= -1;
                break;
            }
            case AngularResizeElementDirection.TOP_LEFT: {
                currentHeightValue *= -1;
                currentWidthValue *= -1;
                break;
            }
        }

        currentWidthValue += this.targetElementWidthValue;
        currentHeightValue += this.targetElementHeightValue;

        if (this.proportionalResize) {
            if (currentWidthValue > currentHeightValue) {
                currentWidthValue = currentHeightValue;
            } else {
                currentHeightValue = currentWidthValue;
            }
        }

        return {
            originalEvent: this.originalEvent,
            currentWidthValue: currentWidthValue,
            currentHeightValue: currentHeightValue,
            originalWidthValue: this.targetElementWidthValue,
            originalHeightValue: this.targetElementHeightValue,
            differenceWidthValue: this.targetElementWidthValue - currentWidthValue,
            differenceHeightValue: this.targetElementHeightValue - currentHeightValue,
        };
    }
}

