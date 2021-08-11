import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringSliderTrackComponent } from './spring-slider-track.component';

describe('SpringSliderTrackComponent', () => {
  let component: SpringSliderTrackComponent;
  let fixture: ComponentFixture<SpringSliderTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringSliderTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringSliderTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
