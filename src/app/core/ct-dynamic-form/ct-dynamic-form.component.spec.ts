import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtDynamicFormComponent } from './ng-dynamic-form.component';

describe('NgDynamicFormComponent', () => {
  let component: CtDynamicFormComponent;
  let fixture: ComponentFixture<CtDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
