import { TestBed } from '@angular/core/testing';

import { BalanzaService } from './balanza.service';

describe('BalanzaService', () => {
  let service: BalanzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
