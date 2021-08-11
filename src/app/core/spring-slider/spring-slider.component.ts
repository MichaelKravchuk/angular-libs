import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-spring-slider',
    templateUrl: './spring-slider.component.html',
    styleUrls: ['./spring-slider.component.scss']
})
export class SpringSliderComponent implements OnInit {
    public a = 2;

    constructor() { }

    ngOnInit(): void {
    }
}
