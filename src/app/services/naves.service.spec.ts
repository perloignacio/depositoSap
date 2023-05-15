import { TestBed } from '@angular/core/testing';

import { NavesService } from './naves.service';

describe('NavesService', () => {
  let service: NavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
