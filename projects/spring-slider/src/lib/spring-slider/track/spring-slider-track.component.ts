import { Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'spring-slider-track',
    templateUrl: './spring-slider-track.component.html',
    styleUrls: ['./spring-slider-track.component.scss']
})
export class SpringSliderTrackComponent implements OnChanges, OnDestroy {
    private readonly resizeListener: () => void;

    private requestAnimationFrame: number;
    private ratio: number;


    @Input()
    public readonly vertical: boolean;


    @Input()
    public readonly offsetWidth: number;


    @Input()
    public readonly offsetHeight: number;


    @Input()
    public readonly sliderWrapper: ElementRef<HTMLDivElement>;


    public get canvasWidth(): number {
        return this.sliderWrapper.nativeElement.offsetWidth;
    }


    public get canvasHeight(): number {
        return this.sliderWrapper.nativeElement.offsetHeight;
    }


    @ViewChild('canvas', { static: true })
    public readonly canvas: ElementRef<HTMLCanvasElement>;


    constructor(private readonly renderer2: Renderer2,
                public readonly elementRef: ElementRef) {
        this.resizeListener = this.renderer2.listen('window', 'resize', () => {
            this.normalizeSize();
            this.renderTickLines();
        });
    }


    public ngOnChanges(changes: SimpleChanges): void {
        if (this.canvasWidth && this.canvasHeight) {
            this.normalizeSize();
            this.renderTickLines();
        }
    }


    public ngOnDestroy(): void {
        this.resizeListener();
    }


    public get ctx(): CanvasRenderingContext2D {
        return this.canvas.nativeElement.getContext('2d');
    }


    private distributionFunction(index: number): number {
        return Math.pow(index / 25, 5) * 100;
    }


    public renderTickLines(): void {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        cancelAnimationFrame(this.requestAnimationFrame);

        this.requestAnimationFrame = requestAnimationFrame(() => {
            this.ctx.beginPath();

            if (this.vertical) {
                this.ctx.translate(0, this.canvasHeight / 2);
                this.drawHLines();
            } else {
                this.ctx.translate(this.canvasWidth / 2, 0);
                this.drawVLines();
            }

            this.ctx.stroke();
            this.ctx.closePath();
        });
    }


    private drawVLines(): void {
        const halfWidth = this.canvasWidth / 2;
        for (let index = -50; index < 50; index++) {
            let x = this.distributionFunction(index);
            if (x > 0) {
                x = halfWidth - x;

                if (x < 0) {
                    continue;
                }

            } else {
                x = -halfWidth - x;

                if (x > 0) {
                    continue;
                }
            }

            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasHeight);
        }
    }


    private drawHLines(): void {
        const halfHeight = this.canvasHeight / 2;

        for (let index = -50; index < 50; index++) {
            let y = this.distributionFunction(index);
            if (y > 0) {
                y = halfHeight - y;

                if (y < 0) {
                    continue;
                }

            } else {
                y = -halfHeight - y;

                if (y > 0) {
                    continue;
                }
            }

            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasWidth, y);
        }
    }


    public normalizeSize(): void {
        const canvas = this.canvas.nativeElement;
        const ctx = this.ctx as any;

        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        this.ratio = devicePixelRatio / backingStoreRatio;

        canvas.width = this.canvasWidth * this.ratio;
        canvas.height = this.canvasHeight * this.ratio;

        canvas.style.width = canvas.width / this.ratio + 'px';
        canvas.style.height = canvas.height / this.ratio + 'px';

        this.ctx.scale(this.ratio, this.ratio);
    }

}
