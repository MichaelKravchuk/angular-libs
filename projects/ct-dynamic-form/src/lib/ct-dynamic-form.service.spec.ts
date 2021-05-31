import { TestBed } from '@angular/core/testing';

import { CtDynamicFormService } from './ct-dynamic-form.service';

describe('CtDynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtDynamicFormService = TestBed.get(CtDynamicFormService);
    expect(service).toBeTruthy();
  });
});
