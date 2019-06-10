import { TestBed } from '@angular/core/testing';

import { RecuperarContrasenaService } from './recuperar-contrasena.service';

describe('RecuperarContrasenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuperarContrasenaService = TestBed.get(RecuperarContrasenaService);
    expect(service).toBeTruthy();
  });
});
