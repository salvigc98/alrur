import { TestBed } from '@angular/core/testing';

import { ComprobarUsuariosService } from './comprobar-usuarios.service';

describe('ComprobarUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprobarUsuariosService = TestBed.get(ComprobarUsuariosService);
    expect(service).toBeTruthy();
  });
});
