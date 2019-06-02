import { TestBed } from '@angular/core/testing';

import { ObtenerLocalidadesProvinciasService } from './obtener-localidades-provincias.service';

describe('ObtenerLocalidadesProvinciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerLocalidadesProvinciasService = TestBed.get(ObtenerLocalidadesProvinciasService);
    expect(service).toBeTruthy();
  });
});
