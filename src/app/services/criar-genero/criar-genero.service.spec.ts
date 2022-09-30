import { TestBed } from '@angular/core/testing';

import { CriarGeneroService } from './criar-genero.service';

describe('CriarGeneroService', () => {
  let service: CriarGeneroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarGeneroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
