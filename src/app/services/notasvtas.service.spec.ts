import { TestBed } from '@angular/core/testing';

import { NotasvtasService } from './notasvtas.service';

describe('NotasvtasService', () => {
  let service: NotasvtasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasvtasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
