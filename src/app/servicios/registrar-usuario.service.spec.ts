import { TestBed } from '@angular/core/testing';

import { RegistrarUsuarioService } from './registrar-usuario.service';

describe('RegistrarUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarUsuarioService = TestBed.get(RegistrarUsuarioService);
    expect(service).toBeTruthy();
  });
});
