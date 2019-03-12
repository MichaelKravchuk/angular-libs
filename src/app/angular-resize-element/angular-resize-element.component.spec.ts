import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularResizeElementComponent } from './angular-resize-element.component';

describe('AngularResizeElementComponent', () => {
    let component: AngularResizeElementComponent;
    let fixture: ComponentFixture<AngularResizeElementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ AngularResizeElementComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AngularResizeElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
