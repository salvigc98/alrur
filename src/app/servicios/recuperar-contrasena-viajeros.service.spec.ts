import { TestBed } from '@angular/core/testing';

import { RecuperarContrasenaViajerosService } from './recuperar-contrasena-viajeros.service';

describe('RecuperarContrasenaViajerosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuperarContrasenaViajerosService = TestBed.get(RecuperarContrasenaViajerosService);
    expect(service).toBeTruthy();
  });
});
