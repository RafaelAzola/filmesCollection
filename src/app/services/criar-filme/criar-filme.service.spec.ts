import { TestBed } from '@angular/core/testing';

import { CriarFilmeService } from './criar-filme.service';

describe('CriarFilmeService', () => {
  let service: CriarFilmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarFilmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
