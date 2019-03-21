import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizedElementComponent } from './resized-element.component';

describe('ResizedElementComponent', () => {
  let component: ResizedElementComponent;
  let fixture: ComponentFixture<ResizedElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizedElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
