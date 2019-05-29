import { TestBed } from '@angular/core/testing';

import { RecuperarContrasenaPropietariosService } from './recuperar-contrasena-propietarios.service';

describe('RecuperarContrasenaPropietariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuperarContrasenaPropietariosService = TestBed.get(RecuperarContrasenaPropietariosService);
    expect(service).toBeTruthy();
  });
});
