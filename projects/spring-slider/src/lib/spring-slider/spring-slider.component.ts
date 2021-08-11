import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { springSlide, springWobbly } from './spring-slider.animation';
import { AxisValue, SingleAxisValue } from './spring-slider.interface';
import { SpringSliderTrackComponent } from './track/spring-slider-track.component';

const ANIMATION_MOVE_START_STATE = { value: 'moveStart' };
const ANIMATION_MOVE_STATE = { value: 'move' };
const ANIMATION_STEPS = 20;


@Component({
    selector: 'spring-slider',
    templateUrl: './spring-slider.component.html',
    styleUrls: ['./spring-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SpringSliderComponent),
            multi: true
        }
    ],
})
export class SpringSliderComponent implements ControlValueAccessor {
    private moveListener: () => void;
    private moveEndListener: () => void;

    private updateValueInterval: Subscription;
    private valueEmitterInterval: Subscription;
    private originalEvent: TouchEvent;
    private innerOffsetWidth: number;
    private innerOffsetHeight: number;

    public innerValue = 0;
    public lastAxisValue: AxisValue = {} as any;

    public disabled: boolean;
    public animationState: { value: string, params?: any };

    @Input()
    public readonly min: number = -Infinity;

    @Input()
    public readonly max: number = Infinity;

    @Input()
    public readonly label: string;

    @Input()
    public readonly showValue: boolean = true;

    @Input()
    @HostBinding('class.vertical')
    public readonly vertical: boolean = false;

    @Input()
    public readonly mode: 'speed' | 'default' = 'default';

    @Input()
    public readonly modelUpdateInterval: number;

    @Output()
    public readonly change: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly changeStart: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly changeEnd: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly openDialog: EventEmitter<any> = new EventEmitter();

    @ViewChild('sliderWrapperSelector', { static: true })
    public readonly sliderWrapper: ElementRef<HTMLDivElement>;

    @ViewChild(SpringSliderTrackComponent, { static: true })
    public readonly track: SpringSliderTrackComponent;

    @ViewChild(SpringSliderTrackComponent, { static: true })
    public readonly thumbHandle: ElementRef<HTMLDivElement>;

    constructor(private readonly renderer2: Renderer2,
                private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
    }


    public runRenderTrack(): void {
        this.track.normalizeSize();
        this.track.renderTickLines();
    }


    public get offsetWidth(): number {
        return this.sliderWrapper.nativeElement.offsetWidth;
    }


    public get offsetHeight(): number {
        return this.sliderWrapper.nativeElement.offsetHeight;
    }


    public writeValue(value: number): void {
        this.innerValue = value;
        this.changeDetectorRef.detectChanges();
    }


    public propagateChange = (_: any) => {};


    public registerOnChange(fn) {
        this.propagateChange = fn;
    }


    public registerOnTouched() {
    }


    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }


    public onValueChange(value: number): void {
        this.propagateChange(value);
        this.changeDetectorRef.markForCheck();
    }


    public onMoveStart(evt: TouchEvent): void {
        evt.preventDefault();

        if (this.disabled) {
            return;
        }

        this.originalEvent = evt;
        this.animationState = ANIMATION_MOVE_START_STATE;
        this.innerOffsetWidth = this.offsetWidth;
        this.innerOffsetHeight = this.offsetHeight;

        this.lastAxisValue = this.generateValuesForEvent(evt);

        this.changeStart.emit(this.innerValue);

        this.runInterval();

        this.moveListener = this.renderer2.listen('document', 'touchmove', event => this.onMove(event));
        this.moveEndListener = this.renderer2.listen('document', 'touchend', event => this.onMoveEnd(event));
    }


    public onTrackClick(evt: TouchEvent): void {
        evt.preventDefault();

        if (this.disabled) {
            return;
        }

        const boundingClientRect = this.track.elementRef.nativeElement.getBoundingClientRect();

        this.onMoveStart({
            ...evt,
            touches: [{
                clientX: boundingClientRect.left + boundingClientRect.width / 2,
                clientY: boundingClientRect.top + boundingClientRect.height / 2
            }],
            preventDefault: () => {}
        } as any);

        this.onMove(evt);
    }


    private onMoveEnd(evt: TouchEvent): void {
        this.moveListener();
        this.moveEndListener();

        this.animationState = { value: 'moveEnd', params: this.generateAnimationParams(this.lastAxisValue) };
        this.changeDetectorRef.detectChanges();

        this.originalEvent = null;

        this.stopInterval();
        this.changeDetectorRef.detectChanges();

        if (this.mode === 'speed') {
            this.onValueChange(0);
        } else {
            this.onValueChange(this.innerValue);
        }

        this.lastAxisValue = {leftPositionPx: 0, topPositionPx: 0} as any;

        this.change.emit(this.innerValue);
        this.changeEnd.emit(this.innerValue);
    }


    private onMove(evt: TouchEvent): void {
        this.lastAxisValue = this.generateValuesForEvent(evt);

        if (this.animationState !== ANIMATION_MOVE_STATE) {
            this.animationState = ANIMATION_MOVE_STATE;
        }

        this.changeDetectorRef.detectChanges();
    }


    private generateValuesForEvent(evt: TouchEvent): AxisValue {
        const xAxis = this.generateValueForAxis(evt, 'clientX', this.innerOffsetWidth);
        const yAxis = this.generateValueForAxis(evt, 'clientY', this.innerOffsetHeight);

        return {
            updatedValuePercentage: xAxis.positionPercentage || yAxis.positionPercentage,
            leftPositionPx: xAxis.positionPx,
            leftPositionPercentage: xAxis.positionPercentage,
            topPositionPx: yAxis.positionPx,
            topPositionPercentage: yAxis.positionPercentage,
        };
    }


    private generateValueForAxis(evt: TouchEvent, axis: 'clientX' | 'clientY', containerSize: number): SingleAxisValue {
        const touche = evt.touches[0];
        if (this.vertical && axis === 'clientX' || !this.vertical && axis === 'clientY') {
            return { positionPercentage: 0, positionPx: 0 };
        }

        let newPositionPercentage: number;

        newPositionPercentage = (touche[axis] - this.originalEvent.touches[0][axis]) / (containerSize / 2);

        if (newPositionPercentage > 1) {
            newPositionPercentage = 1;
        } else if (newPositionPercentage < -1) {
            newPositionPercentage = -1;
        }

        return {
            positionPercentage: newPositionPercentage,
            positionPx: newPositionPercentage * (containerSize / 2),
        };
    }


    private generateAnimationParams(eventValues: any): any {
        return new Array(ANIMATION_STEPS).fill(null).reduce((acc, v, index) => {
            acc[`left_${index}`] = (1 - springWobbly(index / ANIMATION_STEPS)) * eventValues.leftPositionPx + 'px';
            acc[`top_${index}`] = (1 - springWobbly(index / ANIMATION_STEPS)) * eventValues.topPositionPx + 'px';
            return acc;
        }, {});
    }


    public getTransform(): string {
        return `translateX(${this.lastAxisValue.leftPositionPx}px) translateY(${this.lastAxisValue.topPositionPx}px)`;
    }

    private runInterval(): void {
        this.updateValueInterval = interval(20).subscribe(() => {
            let newValue = this.innerValue;

            if (this.mode === 'default') {
                newValue = this.innerValue + Math.pow(this.lastAxisValue.updatedValuePercentage, 3);
            }

            if (newValue < this.min && this.min !== -Infinity) {
                newValue = this.min;
            } else if (newValue > this.max && this.max !== Infinity) {
                newValue = this.max;
            }

            if (newValue !== this.innerValue) {
                this.innerValue = newValue;
                this.changeDetectorRef.detectChanges();
                this.change.emit(this.innerValue);
            }
        });

        if (this.modelUpdateInterval) {
            let prevEmittedValue = null;

            this.valueEmitterInterval = interval(this.modelUpdateInterval).subscribe(() => {
                let emittedValue;

                if (this.mode === 'speed') {
                    emittedValue = this.lastAxisValue.updatedValuePercentage;
                } else {
                    emittedValue = this.innerValue;
                }

                if (prevEmittedValue !== emittedValue) {
                    prevEmittedValue = emittedValue;
                    this.onValueChange(emittedValue);
                }
            });
        }
    }


    private stopInterval(): void {
        if (this.updateValueInterval) {
            this.updateValueInterval.unsubscribe();
        }

        if (this.valueEmitterInterval) {
            this.valueEmitterInterval.unsubscribe();
        }
    }
}
