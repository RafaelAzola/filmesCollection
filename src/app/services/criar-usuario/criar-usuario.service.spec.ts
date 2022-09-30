import { TestBed } from '@angular/core/testing';

import { CriarUsuarioService } from './criar-usuario.service';

describe('CriarUsuarioService', () => {
  let service: CriarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
