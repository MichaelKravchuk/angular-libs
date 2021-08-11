import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpringSliderComponent } from './spring-slider/spring-slider.component';
import { SpringSliderTrackComponent } from './spring-slider/track/spring-slider-track.component';


@NgModule({
    declarations: [SpringSliderComponent, SpringSliderTrackComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [SpringSliderComponent]
})
export class SpringSliderModule {
}
