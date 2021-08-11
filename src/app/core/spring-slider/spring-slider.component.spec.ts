import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringSliderComponent } from './spring-slider.component';

describe('SpringSliderComponent', () => {
  let component: SpringSliderComponent;
  let fixture: ComponentFixture<SpringSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
