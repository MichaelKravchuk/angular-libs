# Angular-Resize-Element

An angular 4.0+ directive that allows an element to be resized


## Demo
https://michaelkravchuk.github.io/angular-libs/resize-element

## Usage

**Step 1:** Install angular-resize-element

```sh
npm install angular-resize-element --save
```

**Step 2:** Import angular resize element module into your app module

```ts
....
import { AngularResizeElementModule } from 'angular-resize-element';

....

@NgModule({
    ...
    imports: [
        ....
        AngularResizeElementModule
    ],
    ....
})
export class AppModule { }
```

**Step 3:** Add HTML code

```html
<div class="container" #container [style.width.px]="data.width" [style.height.px]="data.height">
    <div class="resize resize__right"
         (resize)="onResize($event)"
         [targetElement]="container"
         [direction]="AngularResizeElementDirection.RIGHT"
    ></div>

    <div class="resize resize__bottom--right"
         (resize)="onResize($event)"
         [targetElement]="container"
         [direction]="AngularResizeElementDirection.BOTTOM_RIGHT"
    ></div>
</div>
```

Or if you use angular component (and look at TS)

```html
   [targetElement]="containerComponent"
```

**Step 4:** Add ts code

```ts
  public readonly AngularResizeElementDirection = AngularResizeElementDirection;
  public data: any = {};

  public onResize(evt: AngularResizeElementEvent): void {
        this.data.width = evt.currentWidthValue;
        this.data.height = evt.currentHeightValue;
  }
```

and add ViewChild if you use angular component  (don`t forget about breaking changes when you use *ngIf with ViewChild)

```ts
  @ViewChild('container',  {read: ElementRef})
  public readonly containerElement;
```

**Step 5:** Add css to angular.json config

```
 "styles": [
    ...
    "node_modules/angular-resize-element/bundles/style.css"
],
```

## Interfaces
```ts
enum AngularResizeElementDirection {
    TOP = 'top',
    TOP_RIGHT = 'top-right',
    RIGHT = 'right',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM = 'bottom',
    BOTTOM_LEFT = 'bottom-left',
    LEFT = 'left',
    TOP_LEFT = 'top-left'
}

interface AngularResizeElementEvent {
    currentWidthValue: number;
    currentHeightValue: number;
    originalWidthValue: number;
    originalHeightValue: number;
    differenceWidthValue: number;
    differenceHeightValue: number;
    originalEvent: MouseEvent;
}
```

## API

| Attribute      | Type   | Description
|----------------|--------|------------
| resizeStart | () => AngularResizeElementEvent | This event is fired when resize is started (only one time) 
| resize | () => AngularResizeElementEvent | This event is fired when mouse move and size is changed 
| resizeEnd | () => AngularResizeElementEvent | This event is fired when resize is finished (only one time) 
| targetElement | HTMLElement | Element that will be resize
| direction | AngularResizeElementDirection | Direction of resizing
| proportionalResize | boolean | Proportional size change (width = height)
| applyClass | string | CSS class that will be assigned to the "targetElement" when the "resizeStart "is called and will be removed when "resizeEnd"is called





## License
[MIT](https://choosealicense.com/licenses/mit/)
