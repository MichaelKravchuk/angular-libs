import { TestBed } from '@angular/core/testing';

import { AngularResizeElementService } from './angular-resize-element.service';

describe('AngularResizeElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularResizeElementService = TestBed.get(AngularResizeElementService);
    expect(service).toBeTruthy();
  });
});
