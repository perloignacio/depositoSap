import { TestBed } from '@angular/core/testing';

import { ZkitService } from './zkit.service';

describe('ZkitService', () => {
  let service: ZkitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZkitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
