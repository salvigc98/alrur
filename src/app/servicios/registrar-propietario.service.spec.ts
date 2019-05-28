import { TestBed } from '@angular/core/testing';

import { RegistrarPropietarioService } from './registrar-propietario.service';

describe('RegistrarPropietarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarPropietarioService = TestBed.get(RegistrarPropietarioService);
    expect(service).toBeTruthy();
  });
});
