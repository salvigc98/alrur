import { TestBed } from '@angular/core/testing';

import { ComprobarPropietarioService } from './comprobar-propietario.service';

describe('ComprobarPropietarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprobarPropietarioService = TestBed.get(ComprobarPropietarioService);
    expect(service).toBeTruthy();
  });
});
